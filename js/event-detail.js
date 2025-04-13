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

const user = localStorage.getItem("users");
const logOutIcon = document.getElementById("logOut");
const signOutText = document.getElementById("sign-out-text");
const userAccount = document.getElementById("userAccount");
const user_name = document.getElementById("user-name");
const user_surname = document.getElementById("user-surname");

if (user) {
    let parseUser = JSON.parse(user);
    userAccount.innerHTML = parseUser.name;
    user_name.innerHTML = parseUser.name;
    user_surname.innerHTML = parseUser.surname;
    logOutIcon.classList.remove("hidden");
} else {
    signOutText.innerHTML = `<a href='login.html'>login</a>`;
}

logOutIcon.addEventListener('click', () => {
    localStorage.removeItem("users");
    window.location.href = "login.html";
});



// const eventData = JSON.parse(localStorage.getItem('eventDetails'));

// if (eventData) {
//     document.getElementById('eventTitle').textContent = eventData.title;
//     document.getElementById('eventCategory').textContent = eventData.category;
//     document.getElementById('eventType').textContent = eventData.eventType;
//     document.getElementById('eventImage').src = eventData.image;
//     document.getElementById('eventDate').textContent = eventData.date;
//     document.getElementById('price').textContent = eventData.price;
// } else {
//     alert('Məlumatlar tapılmadı!');
// }


const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 1 ${currentYear + 1} 00:00:00`);

function updateCountDownTime() {
    const currentTime = new Date();
    const diff = newYearTime - currentTime;

    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;

    // console.log(s);
    days.innerHTML = d;
    hours.innerHTML = h < 10 ? '0' + h : h;
    minutes.innerHTML = m < 10 ? '0' + m : m;
    seconds.innerHTML = s < 10 ? '0' + s : s;
}


setInterval(updateCountDownTime, 1000);

updateCountDownTime();


const bookNow = document.getElementById('bookNow');

bookNow.addEventListener('click', () => {
    window.location.href = 'order-confirm.html';
});

let loginUser = JSON.parse(localStorage.getItem("users"));

if (loginUser && loginUser.role == "admin") {
    let header = document.querySelector(".admin-button");

    let adminButton = document.createElement("button");
    adminButton.textContent = "Admin Page";
    adminButton.style.width = "100%";
    adminButton.style.height = "100%";
    adminButton.style.border = "none";
    adminButton.style.cursor = "pointer";
    adminButton.style.backgroundColor = "#c20d8d";
    adminButton.style.borderRadius = "3px";
    adminButton.style.color = "#fff";
    adminButton.style.fontSize = "16px";
    adminButton.addEventListener('click', () => {
        window.location.href = "admin.html";
    });

    header.appendChild(adminButton);
};

let events = JSON.parse(localStorage.getItem("events"));
let selectedEventIndex = localStorage.getItem("eventIndex");

let ticketPrice = 0;

if (selectedEventIndex !== null && events[selectedEventIndex]) {
    let event = events[selectedEventIndex];
    document.getElementById("eventTitle").textContent = event.event_name;
    document.getElementById("eventCategory").textContent = event.categoryFilter;
    document.getElementById("eventType").textContent = event.eventType;
    document.getElementById('eventImage').src = event.event_image;
    let formatDateTime = event.event_date.replace("T", " ");
    document.getElementById("eventDate").textContent = formatDateTime;

    ticketPrice = Number(event.ticket_price);
    document.getElementById("price").textContent = ticketPrice + " $";
} else {
    alert("Melumat tapilmadi");
}

let countElement = document.querySelector(".count");
let count = Number(countElement.textContent);
let plus = document.querySelector(".plus span");
let minus = document.querySelector(".minus span");


let counter = count;

function updatePrice(){
    const totalPrice = ticketPrice * counter;
    document.getElementById("price").textContent = totalPrice + " $";
}

function increaseCounter(){
    plus.addEventListener('click', () => {
        counter++;
        countElement.textContent = counter;
        updatePrice();
    });
}

function decreaseCounter(){
    minus.addEventListener('click', () => {
        counter--;
        if (counter <= 1) {
            counter = 1;
        }
        countElement.textContent = counter;
        updatePrice();
    });
}

increaseCounter();
decreaseCounter();

function displayBookmarkEventById(){
    let params = new URLSearchParams(window.location.search);
    let eventId = Number(params.get('id'));
    // console.log(eventId);
    const events = JSON.parse(localStorage.getItem('events')) || [];
    let existingEvent = events.find(event => event.id === eventId);
    console.log(existingEvent);
    if (existingEvent) {
        document.getElementById("eventTitle").textContent = existingEvent.event_name;
        document.getElementById("eventCategory").textContent = existingEvent.categoryFilter;
        document.getElementById("eventType").textContent = existingEvent.eventType;
        document.getElementById('eventImage').src = existingEvent.event_image;
        let formatDateTime = existingEvent.event_date.replace("T", " ");
        document.getElementById("eventDate").textContent = formatDateTime;
        ticketPrice = Number(existingEvent.ticket_price);
        document.getElementById("price").textContent = ticketPrice + " $";
        
    }
}

displayBookmarkEventById();