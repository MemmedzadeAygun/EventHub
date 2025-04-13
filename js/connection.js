
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

            let events = JSON.parse(localStorage.getItem('events')) || [];

            let eventIds = JSON.parse(localStorage.getItem('eventIds')) || [];

            if (events[index] && flag) {
                let eventId = events[index].id;
                console.log(eventId);

                if (!eventIds.includes(eventId)) {
                    eventIds.push(eventId);
                }
                localStorage.setItem('eventIds',JSON.stringify(eventIds));
            }else{
                let eventId = events[index].id;
                if (eventId) {
                    eventIds = eventIds.filter(id => id!==eventId);
                }
                localStorage.setItem('eventIds',JSON.stringify(eventIds));
            }
        });
    });
}
clickIcon();

