const body = document.querySelector("body"),
    modeToggle = body.querySelector(".mode-toggle");
sideBar = body.querySelector("nav");
sideBarToggle = body.querySelector(".sidebar-toggle");
let table=document.querySelector("table");

let getMode=localStorage.getItem("mode");
if (getMode && getMode==="dark") {
    body.classList.toggle("dark");
}

modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    // table.classList.toggle("table-dark");
    if (body.classList.contains("dark")) {
        localStorage.setItem("mode","dark");
    }else{
        localStorage.setItem("mode","light");
    }
    
});


sideBarToggle.addEventListener('click', () => {
    sideBar.classList.toggle("close");
});

const user = document.getElementById("currentUser");
const logOutIcon = document.getElementById("logOut");

logOutIcon.addEventListener('click', () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
});
