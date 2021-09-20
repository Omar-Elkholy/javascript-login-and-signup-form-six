var loginBtn = document.getElementById("login");
var signUpBtn = document.getElementById("signUp");
var logOutBtn = document.getElementById("logOut");
var nameInp = document.getElementById("nameInp");
var emailInp = document.getElementById("emailInp");
var passInp = document.getElementById("passInp");

var signUpinputs = document.querySelectorAll(".signUpInput");
var loginInputs = document.querySelectorAll(".loginInput");

var welcomeMsg = document.getElementById("welcome");


var hintMsg = document.getElementById("hintMsg");
var hintMsg2 = document.getElementById("hintMsg2");
var successMsg = document.getElementById("successMsg");

var allUsers = [];


// Get From Local

getFromLocal();


// Sign Up

if (signUpBtn) {
    signUpBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var user = {
            userName: nameInp.value,
            userEmail: emailInp.value,
            userPassword: passInp.value
        }
        showSuccess(false);

        if (!isEmpty(signUpinputs)) {
            if (!isSignedUpEmail(emailInp.value)) {
                if (validateEmail(emailInp.value)) {
                    if (validatePassword(passInp.value)) {
                        allUsers.push(user);
                        addToLocal();
                        showSuccess(true);
                        hideHint(hintMsg);
                     } else {
                        showHint(hintMsg, `Password Must Contain : <br>
                        1- At least 8 characters. <br>
                        2- At least 1 number. <br>
                        3- At least 1 lowercase character (a-z). <br>
                        4- At least 1 uppercase character (A-Z). <br>
                        5- Contains only numbers & characters. <br>
                        `);
                    }

                } else {
                    showHint(hintMsg, "Email Format is Incorrect");
                }
            } else {
                showHint(hintMsg, "Email already Exists");
            }
        } else {
            showHint(hintMsg, "All inputs are required")
        }
    });
}


// Login

if (loginBtn) {
    loginBtn.addEventListener("click", function (e) {
        e.preventDefault();

        if (!isEmpty(loginInputs)) {
            if (isCorrectEmailPass(emailInp.value, passInp.value)) {
                document.location.href = "welcome.html";
                hideHint(hintMsg2);
            } else {
                showHint(hintMsg2, "Incorrect email or password");
            }
        } else {
            showHint(hintMsg2, "All inputs are required")
        }
    });
}


// Welcome Message

var userLogged = localStorage.getItem('userLoggedIn');

if (welcomeMsg) {
    welcomeMsg.innerHTML = `Welcome ${userLogged}`;
}

// Logout

if (logOutBtn) {
    logOutBtn.addEventListener("click", function () {
        localStorage.removeItem("userLoggedIn");
        document.location.href = "index.html";
    });

}



// ------------------------- Form Validation -------------------------


// Check if Email & Password Are Correct

function isCorrectEmailPass(email, pass) {
    for (var i = 0; i < allUsers.length; i++) {

        if (email == allUsers[i].userEmail && pass == allUsers[i].userPassword) {
            localStorage.setItem('userLoggedIn', allUsers[i].userName);
            return true;
        }
    }
}


// Check If From is Empty

function isEmpty(inputs) {


    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            return true
        }
    }
}

// Check if Email is Signed Up

function isSignedUpEmail(e) {

    for (var i = 0; i < allUsers.length; i++) {

        if (e == allUsers[i].userEmail) {
            return true
        }
    }
}

// Validate Email Format

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Validate Password 

function validatePassword(pass) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return re.test(String(pass));
}

// -------------------------Hint Messages -------------------------

// Show Hint

function showHint(hint, msg) {
    hint.style.display = "block";
    hint.innerHTML = msg;
}


// Hide Hint 

function hideHint(hint) {
    if (hint.style.display == "block") {
        hint.style.display = "none";
    }
}

// Show & Hide Success Message 

function showSuccess(x) {
    if (x == true) {
        successMsg.classList.replace("d-none", "d-block");
    } else {
        successMsg.classList.replace("d-block", "d-none");
    }
}


// Add To Local

function addToLocal() {
    localStorage.setItem("Users", JSON.stringify(allUsers));
}

// Get From Local 
function getFromLocal() {
    var x = localStorage.getItem("Users");

    if (x != null) {
        allUsers = JSON.parse(x);
    }
}
