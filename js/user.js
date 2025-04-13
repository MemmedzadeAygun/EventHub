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

if (user) {
    let parseUser = JSON.parse(user);
    userAccount.innerHTML = parseUser.name;
    logOutIcon.classList.remove("hidden");
} else {
    signOutText.innerHTML = `<a href='login.html'>login</a>`;
}

logOutIcon.addEventListener('click', () => {
    localStorage.removeItem("users");
    window.location.href = "login.html";
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

let name = document.getElementById('name');
let surname = document.getElementById('surname');

let parseUser = JSON.parse(localStorage.getItem('users'));
name.textContent = parseUser.name;
surname.textContent = parseUser.surname;
document.getElementById('description').textContent += ` ${parseUser.name} ${parseUser.surname}`;

function activeSaveOrders() {
    let saved = document.querySelector(".saved");
    let orders = document.querySelector(".orders");

    let bookmark_events = document.querySelector(".bookmark-events");
    let my_orders = document.querySelector(".my-orders");

    saved.classList.add("active");
    bookmark_events.style.display = "block";
    // bookmark_events.style.display = "flex";
    my_orders.style.display="none";
    saved.style.color="#fff";
    orders.style.color="grey";

    saved.addEventListener('click', () => {
        saved.classList.add("active");
        orders.classList.remove("active");
        bookmark_events.style.display = "block";
        // bookmark_events.style.display = "flex";
        saved.style.color="#fff";
        orders.style.color="grey";
        my_orders.style.display="none";
    });

    orders.addEventListener('click', () => {
        orders.classList.add("active");
        saved.classList.remove("active");
        bookmark_events.style.display = "none";
        saved.style.color="grey";
        orders.style.color="#fff";
        my_orders.style.display="block";
    })
}

activeSaveOrders();


function displayBookmark(){
    let eventIds = JSON.parse(localStorage.getItem('eventIds')) || [];
    let events = JSON.parse(localStorage.getItem('events')) || [];

    let bookmarkEvents = events.filter(event => eventIds.includes(event.id));

    let container = document.querySelector('.bookmark-events');

    if (container) {
        container.innerHTML = "";

        bookmarkEvents.forEach(bookmarkEvent => {
            let bookmark_event = document.createElement('div');
            bookmark_event.classList.add('bookmark-event');

            let bookmark_event_image = document.createElement('div');
            bookmark_event_image.classList.add('bookmark-event-image');

            let image = document.createElement('img');
            image.src = bookmarkEvent.event_image;

            let bookmark_event_detail = document.createElement('div');
            bookmark_event_detail.classList.add('bookmark-event-detail');

            let eventName = document.createElement('h4');
            eventName.textContent = bookmarkEvent.event_name;

            let eventDate = document.createElement('p');
            eventDate.textContent = bookmarkEvent.event_date;

            let detail_icon = document.createElement('div');
            detail_icon.classList.add('detail-icon');

            let icon = document.createElement('i');
            icon.classList.add('fa-solid','fa-eye');

            let iconDetail = document.createElement('a');
            iconDetail.textContent = "View";

            iconDetail.addEventListener('click', (e) => {
                e.preventDefault();
               window.location.href = `event-details.html?id=${bookmarkEvent.id}`;
                
            })
            

            bookmark_event.appendChild(bookmark_event_image);
            bookmark_event.appendChild(bookmark_event_detail);
            bookmark_event_image.appendChild(image);

            bookmark_event_detail.appendChild(eventName);
            bookmark_event_detail.appendChild(eventDate);
            bookmark_event_detail.appendChild(detail_icon);

            detail_icon.appendChild(icon);
            detail_icon.appendChild(iconDetail);

            container.appendChild(bookmark_event);
        });
    }

}

displayBookmark();
