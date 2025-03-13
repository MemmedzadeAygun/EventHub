
function clickIcon() {
    let icons = document.querySelectorAll(".savedIcon i");

    let savedStates = JSON.parse(localStorage.getItem("iconStates")) || [];

    icons.forEach((icon, index) => {
        if (savedStates[index]) {
            icon.classList.add("fa", "fa-bookmark");
            icon.classList.remove("fa-regular");
        } else {
            icon.classList.add("fa-regular", "fa-bookmark");
            icon.classList.remove("fa");
        }

        let flag = savedStates[index] || false;

        icon.addEventListener('click', (event) => {
            event.stopPropagation();

            if (!flag) {
                icon.classList.add("fa", "fa-bookmark");
                icon.classList.remove("fa-regular");
            } else {
                icon.classList.add("fa-regular", "fa-bookmark");
                icon.classList.remove("fa");
            }

            flag = !flag;

            savedStates[index] = flag;

            localStorage.setItem("iconStates", JSON.stringify(savedStates));

            if (flag) {
                saveEvent(index);
            }
        });
    });
}
clickIcon();

// // function saveEvent(eventIndex) {
// //     let events = JSON.parse(localStorage.getItem("events"));
// //     let selectedEvent = events[eventIndex];

// //     if (selectedEvent) {
// //         let part_2_2 = document.querySelector(".part_2_2");

// //         // Dinamik olaraq HTML əlavə edirik
// //         part_2_2.innerHTML += `
// //             <div class="bookmark-events">
// //                 <div class="bookmark-event-image">
// //                     <img src="${selectedEvent.event_image}" alt="Event Image">
// //                 </div>
// //                 <div class="bookmark-event-detail">
// //                     <h4>${selectedEvent.event_name}</h4>
// //                     <p>${selectedEvent.event_date}</p>
// //                     <p>${selectedEvent.ticket_price} $</p>
// //                 </div>
// //             </div>
// //         `;
// //     }
// // }


// function saveEvent(index) {
//     let eventIndex = localStorage.getItem("eventIndex");

//     if (eventIndex != null) {
//         let events = JSON.parse(localStorage.getItem("events"));
//         let selectedEvent = events[eventIndex];
//         // let part_2_2 = document.querySelector(".part_2_2");
//         if (selectedEvent) {
//             let bookmark_events = document.querySelector(".bookmark-events");

//             let bookmark_event = document.createElement("div");
//             bookmark_event.classList.add("bookmark-event");


//             let bookmark_event_image = document.createElement("div");
//             bookmark_event_image.classList.add("bookmark-event-image");


//             let bookmark_event_subimage = document.createElement("img");
//             bookmark_event_subimage.src = selectedEvent.event_image;

//             let bookmark_event_detail = document.createElement("div");
//             bookmark_event_detail.classList.add("bookmark-event-detail");

//             let h4 = document.createElement("h4");
//             h4.textContent = selectedEvent.event_name;

//             let p = document.createElement("p");
//             p.textContent = selectedEvent.event_date;


//             bookmark_event.appendChild(bookmark_event_image);
//             bookmark_event_image.appendChild(bookmark_event_subimage);
//             bookmark_event.appendChild(bookmark_event_detail);
//             bookmark_event_detail.appendChild(h4);
//             bookmark_event_detail.appendChild(p);
//             bookmark_events.appendChild(bookmark_event);

//             console.log(bookmark_event);
//         }

//     }
// }