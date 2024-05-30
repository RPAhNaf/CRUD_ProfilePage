# CRUD_ProfilePage
CRUD Express REST API Creation and Profile Page Design

Instructions:
1. Install all the dependencies dependencies inside the backend folder using the following command-
      "npm install express express-session body-parser bcrypt mysql multer path cors ejs"
2. Create a database and a table in MySQL that has the fields -
          i)   	fname 	varchar(50) 	
	        ii) 	lname 	varchar(50) 	 	
          iii) 	email 	varchar(50) 	
          iv) 	gender 	varchar(50) 	
	        v)   	dob 	date 			
	        vi) 	password 	longtext 	
	        vii) 	img 	mediumblob
3. Edit the "MySQL connection pool" section of server.js file so that it matches the MySQL database.
4. Run this command in backend folder to start the server-
      "node server.js"
5. Open "http://localhost:3000/login.html" on browser to view the login page.
