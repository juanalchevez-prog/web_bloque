// Convierte las contrasenas en texto plano de la tabla users a hash con sal.
// Se puede correr varias veces: ignora las que ya estan hasheadas.
// Uso: node scripts/migrate-passwords.js
import { getConnection, sql } from "../utils/db.js"
import { hashPassword, isHashed } from "../utils/password.js"

const pool = await getConnection()

// El hash con sal mide 97 caracteres; aseguramos que la columna alcance
await pool.request().query("alter table users alter column password varchar(255) not null")

const { recordset } = await pool.request().query("select id, password from users")
let updated = 0
for (const user of recordset) {
    if (isHashed(user.password)) continue
    await pool.request()
        .input("id", sql.Int, user.id)
        .input("password", sql.VarChar, hashPassword(user.password))
        .query("update users set password = @password where id = @id")
    updated++
}
console.log(`Usuarios: ${recordset.length}, actualizados: ${updated}`)
await pool.close()
