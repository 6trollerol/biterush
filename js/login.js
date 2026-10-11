const accountURL = "/accounts";
const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")
const loginBtn = document.querySelector(".login-button")

if (localStorage.getItem("isLoggedIn") === true){
    window.location.href = "index.html"
}

loginBtn.addEventListener("click", () => {
    const username = usernameInput.value
    const password = passwordInput.value
    console.log(username)
    if(username == "" || password == ""){
        alert("Please enter username or password");
    } else{

    fetch(accountURL)
    .then(res => res.json())
    .then(accounts =>{
        const account = accounts.find(account => account.username === username && account.password ===password);
    if (account){
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", account.username);
        localStorage.setItem("role", account.role);
        window.location.href = "index.html";
    } else {
        alert("Wrong username or password")
    }
    })}

}
)