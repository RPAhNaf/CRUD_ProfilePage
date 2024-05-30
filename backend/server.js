const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const saltRounds = 10;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');


// Session setup
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'exampledb'
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serves static files from the public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Register new user
app.post('/api/register', upload.single('image'), (req, res) => {
  const { fname, lname, gender, dob, email, password } = req.body;
  const image = req.file.buffer;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      return res.status(500).send('Server error');
    }
    const query = 'INSERT INTO user (fname, lname, email, gender, dob, password, img) VALUES (?, ?, ?, ?, ?, ?, ?)';
    pool.query(query, [fname, lname, email, gender, dob, hash, image], (err, result) => {
      if (err) {
        return res.status(500).send('Error saving user to database');
      }
      res.send('User registered successfully');
    });
  });
});

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM user WHERE email = ?';
  pool.query(query, [email], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    bcrypt.compare(password, results[0].password, (err, result) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (result) {
        req.session.userEmail = email; // Set userEmail property
        console.log('Session:', req.session); // Log session information
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  });
});
// Profile route
app.get('/api/profile', (req, res) => {
  console.log('Session:', req.session); // Log session information
  if (!req.session.userEmail) {
    return res.redirect('/login.html');
  }

  const userEmail = req.session.userEmail;
  const query = 'SELECT fname, lname, email, gender, dob, img FROM user WHERE email = ?';
  pool.query(query, [userEmail], (err, result) => {
    if (err) {
      return res.status(500).send('Error retrieving user information');
    }

    if (result.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = result[0];
    const dobDate = new Date(user.dob);
    const formattedDob = dobDate.toISOString().split('T')[0];
    res.render('profile', {
      user: {
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        gender: user.gender,
        dob: formattedDob,
        img: user.img.toString('base64')
      }
    });
  });
});

// Update profile
app.put('/api/profile', async (req, res) => {
  if (!req.session.userEmail) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userEmail = req.session.userEmail;
  const { newFname, newLname, newEmail, newGender, newDob, newPassword } = req.body;
  let updatedFields = {
    fname: newFname,
    lname: newLname,
    email: newEmail,
    gender: newGender,
    dob: newDob
  };

  if (newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    updatedFields.password = hashedPassword;
  }

  const query = 'UPDATE user SET ? WHERE email = ?';
  pool.query(query, [updatedFields, userEmail], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error updating user information' });
    }

    // Update session email if it was changed
    if (newEmail) {
      req.session.userEmail = newEmail;
    }

    res.json({ message: 'Profile updated successfully' });
  });
});

// Upload profile image
app.post('/api/profile/image', upload.single('newProfileImage'), async (req, res) => {
  if (!req.session.userEmail) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userEmail = req.session.userEmail;

  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  const query = 'UPDATE user SET img = ? WHERE email = ?';
  pool.query(query, [req.file.buffer, userEmail], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error updating profile image' });
    }

    res.json({ message: 'Profile image uploaded successfully' });
  });
});

// Delete user account
app.delete('/api/profile', (req, res) => {
  if (!req.session.userEmail) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userEmail = req.session.userEmail;
  const query = 'DELETE FROM user WHERE email = ?';

  pool.query(query, [userEmail], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error deleting user account' });
    }

    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ error: 'Error logging out' });
      }
      res.json({ message: 'Account deleted successfully' });
    });
  });
});

//logout
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('http://localhost:3000/login.html');
  });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
