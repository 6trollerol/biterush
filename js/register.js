const accountURL = "http://localhost:3000/accounts";
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const registerBtn = document.querySelector(".submit-btn");

function addUser() {
    let email = emailInput.value.trim();
    let password = passwordInput.value.trim();
    let username = usernameInput.value.trim();
    let confirmedPassword = confirmPasswordInput.value.trim();

    if (!email || !password || !username) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
        
    };
    if (!email.includes("@")) {
        alert("Email phải có ký tự @!");
        return;
    }
    if (password !== confirmedPassword){
        alert("Xác nhận mật khẩu chưa đúng");
        return;
    }

    fetch(accountURL)
        .then(res => res.json())
        .then(data => {
            const usedUsernameOrEmail = data.find(acc => acc.email === email ||  acc.username === username);
            if (usedUsernameOrEmail) {
                alert("Email hoặc username đã được đăng ký!");
            } else {
                fetch(accountURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                        role: "user"
                    })
                })
                .then(res => {
                    if (res.ok) {
                        alert("Đăng ký thành công!");
                    } else {
                        alert("Có lỗi khi đăng ký!");
                    }
                })
                .catch(err => {
                    console.error("Lỗi đăng ký:", err);
                    alert("Lỗi máy chủ!");
                });
            }
        })
        .catch(err => {
            console.error("Lỗi kiểm tra email:", err);
            alert("Không thể kiểm tra email!");
        });
      
}
registerBtn.addEventListener("click", addUser); 
