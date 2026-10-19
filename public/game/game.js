const userId = sessionStorage.userId

if (!userId) {
    // sin sesion: de regreso al login
    window.location = "../index.html"
} else {
    // el videojuego lee el ID de su propia URL
    document.getElementById("juego").src = "webgl/Gammificacion%20web/index.html?id=" + encodeURIComponent(userId)
}

document.getElementById("btnLogout").addEventListener("click", () => {
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("userId")
    window.location = "../index.html"
})
