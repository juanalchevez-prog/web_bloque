console.log("Hola Mundo")
//alert("alerta")

const username = document.getElementById("in_username")
const password = document.getElementById("in_password")
const btnLogin = document.getElementById("btnLogin")

const login = ()=>{
    //alert(username.value+" "+password.value)
    if (username.value === "Alfonso" && password.value === "Chevez"){
        sessionStorage.username = username.value
        localStorage.password = password.value
        window.location = "/profile.html"
    }else{
        alert("credenciales incorrectas")
    }
}

btnLogin.addEventListener("click", login)