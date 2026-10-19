if (!sessionStorage.username) {
    window.location = "../index.html"
} else {
    document.getElementById("username").innerText = sessionStorage.username
}

document.getElementById("btnLogout").addEventListener("click", () => {
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("userId")
    window.location = "../index.html"
})
