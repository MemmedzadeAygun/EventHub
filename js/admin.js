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

const user = document.getElementById("users");
const logOutIcon = document.getElementById("logOut");

logOutIcon.addEventListener('click', () => {
    localStorage.removeItem("users");
    window.location.href = "login.html";
});



let eventForm = document.getElementById("event-form");

eventForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const event_name = document.getElementById("event-name").value;
    const ticket_price = document.getElementById("ticket-price").value;
    const categoryFilter = document.getElementById("categoryFilter").value;
    const eventType = document.getElementById("eventType").value;
    const event_date = document.getElementById("event-date").value;
    const event_image = document.getElementById("event-image-url").value; 

    let index = document.getElementById("saveButton").getAttribute("data-index");
    index=index? parseInt(index) : null;


    saveEvent(event_name,ticket_price,categoryFilter,eventType,event_date,event_image,index);
});


function saveEvent(event_name,ticket_price,categoryFilter,eventType,event_date,event_image,index) {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    const eventId = events.length > 0 ? events[events.length - 1].id + 1 : 1;

    let newEvent = {
        id: eventId,
        event_name: event_name,
        ticket_price: ticket_price,
        categoryFilter: categoryFilter,
        eventType: eventType,
        event_date: event_date,
        event_image: event_image 
    };

    if (index!==null) {
        events[index]=newEvent;
    }else{
        events.push(newEvent);
    }

    localStorage.setItem("events", JSON.stringify(events));

    swal({
        icon: "success",
    }).then(() => {
        eventForm.reset();
        showEvents();
    });
}

function showEvents() {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    let eventTbody = document.getElementById("event-tbody");

    eventTbody.innerHTML = "";

    let count = 1;
    events.forEach((event, index) => {
        let row = document.createElement("tr");
        let formatDateTime = event.event_date.replace("T", " ");

        row.innerHTML = `
            <td>${count++}</td>
            <td>${event.event_name}</td>
            <td>${event.ticket_price}$</td>
            <td>${event.categoryFilter}</td>
            <td>${event.eventType}</td>
            <td>${formatDateTime}</td>
            <td>
                <button type="button" class="btn btn-primary" onclick=editEvent(${index})>
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button" class="btn btn-danger" onclick=deleteEvent(${index})>
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;

        eventTbody.appendChild(row);
    });
}
document.addEventListener("DOMContentLoaded", showEvents);


function editEvent(index) {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    let event = events[index];

    document.getElementById("event-name").value = event.event_name;
    document.getElementById("ticket-price").value = event.ticket_price;
    document.getElementById("categoryFilter").value = event.categoryFilter;
    document.getElementById("eventType").value = event.eventType;
    document.getElementById("event-date").value = event.event_date;
    document.getElementById("event-image-url").value=event.event_image;

    let previewImage = document.getElementById("previewImage");
    if (event.event_image) {
        previewImage.src = event.event_image;
        previewImage.classList.remove("d-none");
    } else {
        previewImage.src = "";
        previewImage.classList.add("d-none");
    }

    let saveButton = document.getElementById("saveButton");
    saveButton.setAttribute("data-index", index);

    let eventModal = new bootstrap.Modal(document.getElementById("exampleModal"));
    eventModal.show();
};


let saveChangeButton = document.getElementById("saveButton");

saveChangeButton.addEventListener('click', () => {
    let index = saveChangeButton.getAttribute("data-index");
    let events = JSON.parse(localStorage.getItem("events"));
    const eventId = events.length > 0 ? events[events.length - 1].id + 1 : 1;


    events[index] = {
        id: eventId,
        event_name: document.getElementById("event-name").value,
        ticket_price: document.getElementById("ticket-price").value,
        categoryFilter: document.getElementById("categoryFilter").value,
        eventType: document.getElementById("eventType").value,
        event_date: document.getElementById("event-date").value,
        event_image: document.getElementById("event-image-url").value
    }

    localStorage.setItem("events", JSON.stringify(events));
    showEvents();

    let eventModal = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
    eventModal.hide();
});

function deleteEvent(index) {
    let events = JSON.parse(localStorage.getItem("events")) || [];

    swal("Are you sure?", {
        buttons: ["Cancel", "OK"],
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {    
            events.splice(index, 1);
            localStorage.setItem("events", JSON.stringify(events));

            showEvents();
        }
    });
}
