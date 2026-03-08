

toMainPage = () => {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value; 

    console.log("User:", user);
    console.log("Pass:", pass);
    console.log("Match:", user === "admin", pass === "admin123");
    if (user.trim() === "admin" && pass.trim() === "admin123"){
        console.log("✅ Credentials correct, redirecting...");
        window.location.replace("main.html");
    }
    else{
        alert("Invalid password or username")
    }
}
