# CRUD_ProfilePage
CRUD Express REST API Creation and Profile Page Design

# **Instructions :**
1. Install all the dependencies dependencies inside the backend folder using the following command- <br/>
```
npm install express express-session body-parser bcrypt mysql multer path cors ejs moment moment-timezone
```
2. Create a database and a table in MySQL that has the fields - <br/>
	&nbsp;&emsp;&emsp;  i)   &ensp;&ensp;fname 		&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;varchar(50) <br/> 	
	&emsp;&emsp; ii) 	&ensp;&ensp;lname 		&nbsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;varchar(50) <br/> 	 	
	&emsp;&emsp;iii) 	&ensp;&ensp;email 		&nbsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;varchar(50) <br/> 	
	&emsp;&emsp;iv) 	&ensp;&ensp;gender 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;varchar(50) <br/>
	&emsp;&emsp;  v)   	&ensp;&ensp;dob 		&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;date <br/> 			
	&emsp;&emsp;vi) 	&ensp;&ensp;password 	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;longtext <br/> 	
	&emsp;&nbsp;&nbsp;&nbsp;vii) 	&ensp;&ensp;img 	 	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mediumblob <br/><br/>
4. Edit the "MySQL connection pool" section of server.js file so that it matches the MySQL database.<br/><br/>
5. Run this command in backend folder to start the server-
      "node server.js"<br/><br/>
6. Open "http://localhost:3000/login.html" on browser to view the login page.

**Overview of project structure :** <br/>
CRUD_ProfilePage/ <br/>
│ <br/>
├── backend/ <br/>
│   ├── views/ <br/>
│   │   └── profile.ejs <br/>
│   └── server.js <br/>
│ <br/>
├── public/ <br/>
│   ├── login.html <br/>
│   └── loginpage.js <br/>
│   └── RegistrationForm.html <br/>
│   └── RegistrationFormScript.js <br/>
└── README.md <br/>

**a.'backend/' :**  <br/>
&emsp;&emsp; 'server.js' - The file is the main code for the backend server.The file sets up the Express server and middleware. <br/>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;And it contents all the necessary routes and edpoints for the different functions. <br/>
**b.'views/' :**  <br/>
&emsp;&emsp; 'profile.ejs'- The template to generate the profile page after the user successfully logins.   <br/>
**c.'public'** <br/>
&emsp;&emsp; 'login.html' - The html file for the login page. <br/>
&emsp;&emsp; 'loginpage.js' - The necessary javascript code for the login page to communicate with backend server. <br/>
&emsp;&emsp; 'RegistrationForm.html' - The html file for the registration form page. <br/>
&emsp;&emsp; 'RegistrationFormScript.js' - The necessary javascript code for the registration page to communicate with backend server. <br/>
<br/><br/>

# API Documentation <br/>
Loginpage URL
"http://localhost:3000/login.html" <br/>
**Endpoints**
1. Register New User

Endpoint: /api/register
Method: POST
Description: Registers a new user with the provided details and an optional profile image.

Request Body:

    fname (string): First name of the user
    lname (string): Last name of the user
    gender (string): Gender of the user
    dob (string): Date of birth of the user (format: YYYY-MM-DD)
    email (string): Email of the user
    password (string): Password of the user
    image (file): Profile image of the user

Response:

    200 OK: User registered successfully
    500 Internal Server Error: Server error or error saving user to the database

2. Login

Endpoint: /api/login
Method: POST
Description: Logs in a user with the provided email and password.

Request Body:

    email (string): Email of the user
    password (string): Password of the user

Response:

    200 OK: Login successful
    401 Unauthorized: Invalid credentials
    500 Internal Server Error: Server error or error executing MySQL query

3. Get User Profile

Endpoint: /api/profile
Method: GET
Description: Retrieves the profile information of the logged-in user.

Request Parameters: None

Response:

    200 OK: Profile information including fname, lname, email, gender, dob, and img (base64-encoded)
    302 Found: Redirect to login page if the user is not logged in
    404 Not Found: User not found
    500 Internal Server Error: Error retrieving user information

4. Update User Profile

Endpoint: /api/profile
Method: PUT
Description: Updates the profile information of the logged-in user.

Request Body:

    newFname (string): New first name of the user
    newLname (string): New last name of the user
    newEmail (string): New email of the user
    newGender (string): New gender of the user
    newDob (string): New date of birth of the user (format: YYYY-MM-DD)
    newPassword (string): New password of the user 
Response:

    200 OK: Profile updated successfully
    401 Unauthorized: Unauthorized (user not logged in)
    500 Internal Server Error: Error updating user information

5. Upload Profile Image

Endpoint: /api/profile/image
Method: POST
Description: Uploads a new profile image for the logged-in user.

Request Body:

    newProfileImage (file): New profile image of the user

Response:

    200 OK: Profile image uploaded successfully
    400 Bad Request: No image uploaded
    401 Unauthorized: Unauthorized (user not logged in)
    500 Internal Server Error: Error updating profile image

6. Delete User Account

Endpoint: /api/profile
Method: DELETE
Description: Deletes the account of the logged-in user.

Request Parameters: None

Response:

    200 OK: Account deleted successfully
    401 Unauthorized: Unauthorized (user not logged in)
    500 Internal Server Error: Error deleting user account or logging out

7. Logout

Endpoint: /logout
Method: POST
Description: Logs out the currently logged-in user.

Request Parameters: None

Response:

    200 OK: Redirect to login page
    500 Internal Server Error: Error logging out
Middleware and Setup

    Session Setup: Uses express-session to manage user sessions.
    Body Parsing: Uses body-parser for parsing request bodies.
    CORS: Uses cors for enabling Cross-Origin Resource Sharing.
    Static Files: Serves static files from the public directory.

Database

    MySQL Connection Pool: Configured to connect to a MySQL database.

Dependencies

    express
    express-session
    body-parser
    bcrypt
    mysql
    multer
    path
    cors
    ejs




