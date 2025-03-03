let subMenu = document.getElementById("subMenu");

function toggleMenu() {
    subMenu.classList.toggle("open-menu");

}

let profile = document.querySelector(".profile");
let profileImg = document.querySelector(".profile-img");
let flag = false;
profileImg.addEventListener('click', () => {
    if (flag) {
        profile.style.border = "1px solid rgb(61, 59, 59)";
    } else {
        profile.style.border = "1px solid green";
    }
    flag = !flag;

});

const body = document.querySelector("body"),
modeToggle = body.querySelector(".mode-toggle");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
    body.classList.toggle("dark");
}

modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }
});

const user=localStorage.getItem("users");
const logOutIcon = document.getElementById("logOut");
const signOutText=document.getElementById("sign-out-text");
const userAccount=document.getElementById("userAccount");

if (user) {
    let parseUser=JSON.parse(user);
    userAccount.innerHTML=parseUser.name;
    logOutIcon.classList.remove("hidden");
}else{
    signOutText.innerHTML = `<a href='login.html'>login</a>`;
}

logOutIcon.addEventListener('click', () => {
    localStorage.removeItem("users");
    window.location.href = "login.html";            
});


let loginUser=JSON.parse(localStorage.getItem("users"));

if (loginUser.role=="admin") {
    let header=document.querySelector(".admin-button");

    let adminButton=document.createElement("button");
    adminButton.textContent="Admin Page";
    adminButton.style.width="100%";
    adminButton.style.height="100%";
    adminButton.style.border="none";
    adminButton.style.cursor="pointer";
    adminButton.style.backgroundColor="#c20d8d";
    adminButton.style.borderRadius="3px";
    adminButton.style.color="#fff";
    adminButton.style.fontSize="16px";
    adminButton.addEventListener('click',()=>{
        window.location.href="admin.html";
    });

    header.appendChild(adminButton);
};