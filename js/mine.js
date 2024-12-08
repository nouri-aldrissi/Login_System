// Getting the HTML elements
let upUsernameInput = document.getElementById("upUsername");
let upEmailInput = document.getElementById("upEmail");
let upPasswordInput = document.getElementById("upPassword");
let inUsernameInput = document.getElementById("inUsername");
let inPasswordInput = document.getElementById("inPassword"); 
let dateLoginlocalKye = "dateLogin";
let dateLoginList = [];
// CSS AND JS NOURI
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container-Nouri");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Load data from localStorage when the page loads
if (JSON.parse(localStorage.getItem(dateLoginlocalKye))) {
    dateLoginList = JSON.parse(localStorage.getItem(dateLoginlocalKye));
    // displayData(dateLoginList);  
}

// Function to save data to localStorage
function addToLocalStorage() {
  localStorage.setItem(dateLoginlocalKye, JSON.stringify(dateLoginList));
}

// Function to add login data 
function addDateLogin() {
    const inputs = [
        upUsernameInput,
        upEmailInput,
        upPasswordInput
    ];

  
        let existingEmail = dateLoginList.find(item => item.Email === upEmailInput.value);

        if (existingEmail) {
            showToastAndModal("This email is already registered. Please use a different email.");
        } else {
            const dateLogin = {
                Username: upUsernameInput.value,
                Email: upEmailInput.value,
                Password: upPasswordInput.value
            };

            dateLoginList.push(dateLogin);

            addToLocalStorage();
            clearForm();
            // console.log(dateLoginList);
        }
  
}

// Validate the form input
function validateForm(input) {
    let regex = {
        upUsername: /^[A-Z][a-z]{2,25}$/, 
        upEmail: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 
        upPassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
    };

    let errorSpan = document.getElementById(`${input.id}-error`);

    if (errorSpan) {
        let isValid = regex[input.id].test(input.value);

        if (isValid) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
            errorSpan.classList.replace("d-block", "d-none"); 
        } else {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            errorSpan.classList.replace("d-none", "d-block");
        }

        return isValid; 
    } else {
        return false;
    }
}
// Function to login
function login() {
    let email = inUsernameInput.value.trim();  
    let password = inPasswordInput.value.trim(); 
    
    if (email === "" || password === "") {
        showToastAndModal("Please enter both email and password.");
        return; 
    }
    
    let user = dateLoginList.find(dateLogin => dateLogin.Email === email);  
    
    if (user) {
        if (user.Password === password) {
          
                window.close("../index.html");
                window.open("./HTML/Home.html");
            // window.location.href = "./HTML/Home.html";
        } else {
            showToastAndModal("Incorrect password. Please try again.");
        }
    } else {
        showToastAndModal("Email not found. Please sign up.");
    }
}

// Function to show toast and modal with message
function showToastAndModal(message) {
    let bBox = `
        <p>${message}</p>
    `;
  
    document.getElementById("modalMessage").innerHTML = bBox;
  
    var myModal = new bootstrap.Modal(document.getElementById('exampleModalCenter'), {
        keyboard: false 
    });
    myModal.show();
}



// Clear the form
function clearForm() {
    upUsernameInput.value = "";
    upEmailInput.value = "";
    upPasswordInput.value = "";
}

// // Function to display data
// function displayData(dataList) {
//     console.log(dataList);
// }
