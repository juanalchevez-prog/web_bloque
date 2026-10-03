const usuario = document.getElementById("in_usuario")
const password = document.getElementById("in_password")
const btnLogin = document.getElementById("btnLogin")

const login = async () => {
    if (!usuario.value || !password.value) {
        alert("Ingresa usuario y contraseña")
        return
    }

    const user = { username: usuario.value, password: password.value }

    try {
        const res = await fetch("http://localhost:4000/login", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user)
        })
        const data = await res.json()

        if (res.ok && data.login === true) {
            sessionStorage.username = data.user.name
            window.location = "/profile/"
        } else {
            alert(data.message || "credenciales incorrectas")
        }
    } catch (err) {
        console.error(err)
        alert("No se pudo conectar con el servidor")
    }
}

btnLogin.addEventListener("click", login)
