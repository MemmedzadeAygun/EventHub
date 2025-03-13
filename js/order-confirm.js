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

if (loginUser.role == "admin") {
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

function confirm() {
    const confirmButton = document.querySelector(".confirm");

    confirmButton.addEventListener('click', (event) => {
        event.preventDefault();

        let isValid = true;

        function validateInput(selector, minLength, regex = null) {
            let input = document.querySelector(selector);
            let value = input.value;

            if (!value) {
                input.style.border = "2px solid red";
                isValid = false;
            }
            else if (regex) {
                if (!regex.test(value)) {
                    input.style.border = "2px solid red";
                    isValid = false;
                } else {
                    input.style.border = "2px solid green";
                }
            } else if (value.length < minLength) {
                input.style.border = "2px solid red";
                isValid = false;
            } else {
                input.style.border = "2px solid green";
            }
            return value;
        }

        const firstname = validateInput(".firstname input", 2);
        const lastname = validateInput(".lastname input", 2);
        const email = validateInput(".email input", 5, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        const address = validateInput(".address input", 5);
        const country = validateInput(".country input", 2);
        const state = validateInput(".state input", 4);
        const city = validateInput(".city input", 4);
        const zipCode = validateInput(".zip-code input", 4, /^[0-9]{4,6}$/);

        const cardNumber = validateInput(".card-number input", 16, /^[0-9]{16}$/);
        const expiryDate = validateInput(".expiry-date input", 5, /^(0[1-9]|1[0-2])\/\d{2}$/);
        const cvv = validateInput(".cvv input", 3, /^[0-9]{3}$/);

        if (isValid) {
            const userDetails = { firstname, lastname, email, address, country, state, city, zipCode };
            const cardDetails = { cardNumber, expiryDate, cvv };

            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            localStorage.setItem("cardDetails", JSON.stringify(cardDetails));

           
            document.querySelectorAll("input").forEach(input => {
                input.value="";
                input.style.border="";
            });

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfully Complated",
                showConfirmButton: false,
                timer: 1500,
                willClose: () => {
                    window.location.href = "book-confirmed.html";
                }
            });
            // setTimeout(() => {
            //     window.location.href = "book-confirmed.html";
            // }, 1600);

        } else {
            Swal.fire({
                title: "Please enter all information correctly!",
                confirmButtonColor:"red",
                showClass: {
                    popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                    popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
            });
        }
    })
}

confirm();

// localStorage.removeItem("userDetails"); 
// localStorage.removeItem("cardDetails");

// function orderedEvents(){

//     let events = JSON.parse(localStorage.getItem("events"));
//     let selectedEventIndex = localStorage.getItem("eventIndex");

//     if (selectedEventIndex !== null && events[selectedEventIndex]) {
//         let event = events[selectedEventIndex];

//         let orderedEvents=document.querySelector(".order-events");

//         let order_event=document.createElement("div");
//         order_event.classList.add("order-event");

//         let event_image=document.createElement("div");
//         event_image.classList.add("event-image");

//         let img=document.createElement("img");
//         img.src=event.event_image;

//         let event_detail=document.createElement("div");
//         event_detail.classList.add("event-detail");

//         let h4=document.createElement("h4");
//         h4.textContent=event.event_name;

//         let p=document.createElement("p");
//         p.textContent=event.event_date;

//         order_event.appendChild(event_image);
//         event_image.appendChild(img);
//         order_event.appendChild(event_detail);
//         event_detail.appendChild(h4);
//         event_detail.appendChild(p);
//         orderedEvents.appendChild(order_event);
//     }
// }

// orderedEvents();

