import { getConnection, sql } from "../utils/db.js"

export const login = async (req, res) => {
  const { username, password } = req.body ?? {}
  if (!username || !password) {
    return res.status(400).json({ message: "username y password son requeridos" })
  }

  try {
    const pool = await getConnection()
    const result = await pool.request()
      .input("username", sql.VarChar, username)
      .query("select id, name, username, password from users where username = @username")

    const user = result.recordset[0]
    if (user && user.password === password) {
      return res.status(200).json({
        login: true,
        user: { id: user.id, name: user.name, username: user.username }
      })
    }
    return res.status(401).json({ login: false, user: {}, message: "credenciales invalidas" })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ login: false, message: "error de servidor" })
  }
}
