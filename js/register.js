let registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let username = document.getElementById("username").value.trim().toLowerCase();
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // let userExist = users.find(user => {
    //     return user.username === username;
    // });

    // if (userExist) {
    //     alert("User exists");
    //     return;
    // }

    let role=username==="admin"? "admin":"user";
    // if (username==="admin") {
    //     role="admin"
    // }else if (username==="user") {
    //     role="user"
    // }else{
    //     role=null
    // }

    let newUser = {
        name: name,
        surname:surname,
        username: username,
        password: password,
        role:role
    };

    // localStorage.removeItem("users");

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    // localStorage.removeItem("users");
    swal("Success!", "You clicked the button!", "success")
    .then(()=>{
        window.location.href = "login.html";
    });
});
