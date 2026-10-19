import { getConnection, sql } from "../utils/db.js"

// GET /game/:id -> { name, points }
export const getGameUser = async (req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request()
            .input("id", sql.Int, req.params.id)
            .query("select name, points from users where id = @id")
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "usuario no encontrado" })
        }
        const { name, points } = result.recordset[0]
        res.json({ name, points: points ?? 0 })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "error de servidor" })
    }
}

// PUT /game/:id  body: { points } -> actualiza solo los puntos
export const putGamePoints = async (req, res) => {
    const points = Number(req.body?.points)
    if (!Number.isInteger(points) || points < 0) {
        return res.status(400).json({ message: "points debe ser un entero mayor o igual a 0" })
    }
    try {
        const pool = await getConnection()
        const result = await pool.request()
            .input("id", sql.Int, req.params.id)
            .input("points", sql.Int, points)
            .query("update users set points = @points where id = @id")
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "usuario no encontrado" })
        }
        res.json({ points })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "error de servidor" })
    }
}
