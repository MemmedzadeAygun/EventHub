let events=JSON.parse(localStorage.getItem("events"));
let selectedEventIndex=localStorage.getItem("eventIndex");
let currentUser=JSON.parse(localStorage.getItem("currentUser"));

if (selectedEventIndex !== null && events[selectedEventIndex]) {
    let event = events[selectedEventIndex];
    document.getElementById("event-image").src=event.event_image;
    document.getElementById("event-name").textContent=event.event_name;
    document.getElementById("username").textContent=currentUser.name;
    document.getElementById("usersurname").textContent=currentUser.surname;
    let formatDateTime=event.event_date.replace("T"," ");
    document.getElementById("event-date").textContent=formatDateTime;
    document.getElementById("price").textContent=event.ticket_price + "$";
}else{
    alert("Melumat tapilmadi");
}
 
const body = document.querySelector("body")

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
    body.classList.toggle("dark");
}else{
    body.classList.toggle("light");
}