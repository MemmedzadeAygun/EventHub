let form=document.getElementById("loginForm");
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let username=document.getElementById("username").value;
    let password=document.getElementById("password").value;

    let users=JSON.parse(localStorage.getItem("users")) || [];

    let user=users.find(u=>{
       return u.username==username;
    });

    if (user) {
        if (user.password===password) {
            localStorage.setItem("users",JSON.stringify(user));
            user.role=="user"? window.location.href="index.html": window.location.href="admin.html";
        }else{
            alert("Incorrect password");
        }
    }else{
        alert("User not found");
    }
});