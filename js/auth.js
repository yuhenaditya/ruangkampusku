// =========================
// REGISTER FUNCTION
// =========================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("regName").value;
        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;

        // cek apakah email sudah digunakan
        const existingUser = localStorage.getItem(email);

        if (existingUser) {
            alert("Email sudah terdaftar!");
            return;
        }

        // simpan user
        const userData = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem(email, JSON.stringify(userData));

        alert("Registrasi berhasil! Silahkan login.");
        window.location.href = "index.html"; // kembali ke login
    });
}



// =========================
// LOGIN FUNCTION
// =========================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const userData = JSON.parse(localStorage.getItem(email));

        if (!userData) {
            alert("Email tidak ditemukan!");
            return;
        }

        if (password !== userData.password) {
            alert("Password salah!");
            return;
        }

        // Log the user in
        localStorage.setItem("loggedInUser", email);

        window.location.href = "select-building.html"; // masuk ke aplikasi
    });
}



// =========================
// LOGOUT FUNCTION
// =========================
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}



// =========================
// CEK LOGIN (PROTECT PAGE)
// =========================
function requireLogin() {
    const user = localStorage.getItem("loggedInUser");
    if (!user) {
        window.location.href = "index.html";
    }
}
