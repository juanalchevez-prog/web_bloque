import { sha256, hashPassword, verifyPassword } from "../utils/password.js"

console.log("--- 1. Hash de un texto (SHA-256)")
console.log("hola mundo  ->", sha256("hola mundo"))

console.log("\n--- 2. Mismo texto, mismo hash")
console.log("hola mundo  ->", sha256("hola mundo"))
console.log("iguales:", sha256("hola mundo") === sha256("hola mundo"))

console.log("\n--- 3. Cambio minimo, hash totalmente distinto")
const a = sha256("hola mundo")
const b = sha256("hola mundO")
console.log("hola mundo  ->", a)
console.log("hola mundO  ->", b)
let diff = 0
for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) diff++
console.log(`caracteres distintos: ${diff} de ${a.length}`)

console.log("\n--- 4. Contrasenas con sal: misma contrasena, hashes distintos")
const h1 = hashPassword("1234")
const h2 = hashPassword("1234")
console.log(h1)
console.log(h2)
console.log("iguales:", h1 === h2)
console.log("verifica 1234 con h1:", verifyPassword("1234", h1))
console.log("verifica 1234 con h2:", verifyPassword("1234", h2))
console.log("verifica 12345 con h1:", verifyPassword("12345", h1))
