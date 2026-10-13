import crypto from "node:crypto"
import "dotenv/config"

// Formato guardado en la BD: "<sal en hex>:<hash en hex>"
const SALT_BYTES = 16
const KEY_BYTES = 32
const HASH_FORMAT = /^[0-9a-f]{32}:[0-9a-f]{64}$/

// Pimienta opcional: un secreto global que vive en .env, no en la BD
const pepper = () => process.env.PEPPER ?? ""

const derive = (password, salt) =>
    crypto.scryptSync(password + pepper(), salt, KEY_BYTES)

// Hash simple (sin sal) solo para las pruebas de la practica
export const sha256 = (text) =>
    crypto.createHash("sha256").update(text).digest("hex")

// Cada contrasena recibe una sal aleatoria distinta
export const hashPassword = (password) => {
    const salt = crypto.randomBytes(SALT_BYTES)
    const hash = derive(password, salt)
    return salt.toString("hex") + ":" + hash.toString("hex")
}

export const verifyPassword = (password, stored) => {
    if (typeof stored !== "string" || !HASH_FORMAT.test(stored)) return false
    const [saltHex, hashHex] = stored.split(":")
    const expected = Buffer.from(hashHex, "hex")
    const actual = derive(password, Buffer.from(saltHex, "hex"))
    return crypto.timingSafeEqual(actual, expected)
}

export const isHashed = (stored) => HASH_FORMAT.test(stored ?? "")
