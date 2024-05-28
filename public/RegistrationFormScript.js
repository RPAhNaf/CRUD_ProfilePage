const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
function register() {
    const fname = document.getElementById('fname').value;
    //const fname_text = f_input.value;
    const lname = document.getElementById('lname').value;
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const retype_password = document.getElementById('retypePassword').value;
    const image = document.getElementById('image').files[0];

    if (!fname || fname == '') {
        alert('Please Insert First Name');
        return
    }
    if (!lname || lname == '') {
        alert('Please Insert last_name');
        return
    }
    if (!dob) {
        alert('Please Insert dob');
        return
    }

    if (!email) {
        alert('Please Insert email');
        return
    } else {
        if (!validateEmail(email)) {
            alert('Invalid email');
            return
        }
    }
    if (image==undefined) {
        alert('Please Insert image');
        return
    }
    if (!password || !retype_password || password.length < 5 || retype_password.length < 5) {
        alert('use strong password');
        return
    }
    else {
        if (retype_password != password) {
            alert(' password not matched!');
            return
        }
    }

    const formData = new FormData();
            formData.append('fname', fname);
            formData.append('lname', lname);
            formData.append('gender', gender);
            formData.append('dob', dob);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('image', image);


    fetch("http://localhost:3000/api/register", {
    method: "POST",
    body: formData
    }).then(res => {
        console.log("Request complete! response:", res);
        window.location.replace("login.html");
        
    });

}