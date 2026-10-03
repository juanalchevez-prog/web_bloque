import { getConnection, sql } from "../utils/db.js"

export const getUsers = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query("select id, name, age, points, username from users")
        res.json(result.recordset)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "error de servidor" })
    }
}

export const getUser = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request()
            .input("id", sql.Int, req.params.id)
            .query("select id, name, age, points, username from users where id = @id")
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "usuario no encontrado" })
        }
        res.json(result.recordset[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "error de servidor" })
    }
}

export const postUser = async (req, res) => {
    const { name, age, points, username, password } = req.body ?? {}
    if (!name || !username || !password) {
        return res.status(400).json({ message: "name, username y password son requeridos" })
    }
    try {
        const pool = await getConnection()
        const result = await pool.request()
            .input("name", sql.VarChar, name)
            .input("age", sql.Int, age)
            .input("points", sql.Int, points)
            .input("username", sql.VarChar, username)
            .input("password", sql.VarChar, password)
            .query("insert into users (name, age, points, username, password) values (@name, @age, @points, @username, @password)")
        res.status(201).json(result)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "error de servidor" })
    }
}

export const putUser = async (req, res) => {
    const { name, age, points, username, password } = req.body ?? {}
    try {
        const pool = await getConnection()
        const result = await pool.request()
            .input("name", sql.VarChar, name)
            .input("age", sql.Int, age)
            .input("points", sql.Int, points)
            .input("username", sql.VarChar, username)
            .input("password", sql.VarChar, password)
            .input("id", sql.Int, req.params.id)
            .query("update users set name=@name, age=@age, points=@points, username=@username, password=@password where id=@id")
        res.json(result)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "error de servidor" })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request()
            .input("id", sql.Int, req.params.id)
            .query("delete from users where id = @id")
        res.json(result)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "error de servidor" })
    }
}
