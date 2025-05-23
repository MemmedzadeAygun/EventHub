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


function filterCategoryAndType() {
    let selectedEventType = document.getElementById("eventType");
    let selectedCategory = document.getElementById("categoryFilter");
    let findButton = document.getElementById("findBtn");

    let cardsDiv = document.getElementById("cards");
    let cards = cardsDiv.querySelectorAll(".card");

    findButton.addEventListener('click', () => {
        const selectedEventTypeValue = selectedEventType.value;
        const selectedCategoryValue = selectedCategory.value;

        cards.forEach(card => {
            let categoryAttribute = card.getAttribute("data-category");
            let eventTypeAttribute = card.getAttribute("data-event-type");

            if (selectedCategoryValue == "All" && selectedEventTypeValue == "browse all") {
                card.style.display = "block";
            } else if (categoryAttribute == selectedCategoryValue && eventTypeAttribute == selectedEventTypeValue) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}



let user = localStorage.getItem("currentUser");
let logOutIcon = document.getElementById("logOut");
let signOutText = document.getElementById("sign-out-text");
if (user) {
    let parseUser = JSON.parse(user);
    document.getElementById("userAccount").innerHTML = parseUser.name;
    document.getElementById("logOut").classList.remove("hidden");
} else {
    signOutText.innerHTML = `<a href='login.html'>login</a>`;
}

logOutIcon.addEventListener('click', () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
});

let cards = document.querySelectorAll(".card");

let loginUser = JSON.parse(localStorage.getItem("currentUser"));

let header = document.querySelector(".admin-button");
if (loginUser && loginUser.role == "admin") {

    header.style.display = "block";
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

    function updateFontSize() {
        if (window.matchMedia("(min-width: 601px) and (max-width: 767px)").matches) {
            adminButton.style.fontSize = "14px";
        } else {
            adminButton.style.fontSize = "16px";
        }
    }

    updateFontSize();
}else{
    header.style.display = "none";
}

function filterCategory() {
    let categories = document.querySelectorAll(".category");
    // let cards = document.querySelectorAll(".card");
    let cardsDiv = document.getElementById("cards");
    let cards = cardsDiv.querySelectorAll(".card");


    categories.forEach(category => {
        category.addEventListener('click', () => {
            let selectedCategory = category.textContent.trim();

            categories.forEach(category => {
                category.classList.remove("active");
            });

            category.classList.add("active");

            cards.forEach(card => {
                const cardCategory = card.getAttribute("data-category").trim();

                if (selectedCategory == "All") {
                    card.style.display = "block";
                }
                else if (cardCategory == selectedCategory) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

let events = JSON.parse(localStorage.getItem("events")) || [];


function createCard(event, index) {
    let card = document.createElement("div");
    card.classList.add("card");

    let card_img = document.createElement("div");
    card_img.classList.add("card-img");

    let savedIcon = document.createElement("div");
    savedIcon.classList.add("savedIcon");

    let icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-bookmark");

    let savedStates = JSON.parse(localStorage.getItem("savedStates")) || {};

    if (savedStates[index]) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa", "fa-bookmark");
    }

    savedIcon.appendChild(icon);

    savedIcon.appendChild(icon);

    let card_content = document.createElement("div");
    card_content.classList.add("card-content");

    let img = document.createElement("img");
    img.src = event.event_image;

    let h3 = document.createElement("h3");
    h3.textContent = event.event_name;

    let p = document.createElement("p");
    let formatTicketPrice = `${event.ticket_price}$`
    p.textContent = formatTicketPrice;

    if (document.body.classList.contains("dark")) {
        p.style.color = "white";
    } else {
        p.style.color = "black";
    }

    const observer = new MutationObserver(() => {
        if (document.body.classList.contains("dark")) {
            p.style.color = "white";
        } else {
            p.style.color = "black";
        }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });


    let span = document.createElement("span");
    let formatDateTime = event.event_date.replace("T", " ");
    span.textContent = formatDateTime;

    card.appendChild(card_img);
    card_img.appendChild(img);
    card_img.appendChild(savedIcon);
    card.appendChild(card_content);
    card_content.appendChild(h3);
    card_content.appendChild(p);
    card_content.appendChild(span);

    card.setAttribute("data-category", event.categoryFilter.trim());
    card.setAttribute("data-event-type", event.eventType.trim());

    card.addEventListener('click', () => {
        localStorage.setItem("eventIndex", index);
        window.location.href = "event-details.html";
    });

    return card;
}

function addCard() {
    let cardsDiv = document.getElementById("cards");

    cardsDiv.innerHTML = "";

    let events = JSON.parse(localStorage.getItem("events")) || [];

    events.forEach((event, index) => {
        let newCard = createCard(event, index);
        cardsDiv.appendChild(newCard);
    });

    filterCategory();
    filterCategoryAndType();

   
}

addCard();
