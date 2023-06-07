// Check login state and show/hide the "Log out" button accordingly
let isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn === "true") {
    document.getElementById("login-button-container").style.display = "none";
    document.getElementById("logout-button-container").style.display = "block";
} else {
    document.getElementById("login-button-container").style.display = "block";
    document.getElementById("logout-button-container").style.display = "none";
}