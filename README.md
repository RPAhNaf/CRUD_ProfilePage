# CRUD_ProfilePage
CRUD Express REST API Creation and Profile Page Design

**Instructions:**
1. Install all the dependencies dependencies inside the backend folder using the following command- <br/>
  &emsp; &emsp;    "npm install express express-session body-parser bcrypt mysql multer path cors ejs"
2. Create a database and a table in MySQL that has the fields - <br/>
	&nbsp;&emsp;&emsp;  i)   &ensp;&ensp;fname 		&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;varchar(50) <br/> 	
	&emsp;&emsp; ii) 	&ensp;&ensp;lname 		&nbsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;varchar(50) <br/> 	 	
	&emsp;&emsp;iii) 	&ensp;&ensp;email 		&nbsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;varchar(50) <br/> 	
	&emsp;&emsp;iv) 	&ensp;&ensp;gender 		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;varchar(50) <br/>
	&emsp;&emsp;  v)   	&ensp;&ensp;dob 		&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;date <br/> 			
	&emsp;&emsp;vi) 	&ensp;&ensp;password 	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;longtext <br/> 	
	&emsp;&nbsp;&nbsp;&nbsp;vii) 	&ensp;&ensp;img 	 	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mediumblob <br/>
4. Edit the "MySQL connection pool" section of server.js file so that it matches the MySQL database.
5. Run this command in backend folder to start the server-
      "node server.js"
6. Open "http://localhost:3000/login.html" on browser to view the login page.

