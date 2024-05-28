const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

function loginfunc() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
        if (!email) {
            alert('Please Insert email');
            return;
        } else if (!validateEmail(email)) {
            alert('Invalid email');
            return;
        }

        if (!password) {
            alert('Please Insert password');
            return;
        }

  var data = {
    email: email,
    password: password
  };

  fetch("http://localhost:3000/api/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      response.json().then(data => {
        window.location.href = 'http://localhost:3000/api/profile'; 
      });
    } else {
      alert('Login failed. Please check your credentials.');
    }
  })
  .catch(error => {
    console.error('Error:', error); 
  });
}
