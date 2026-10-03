import express from "express"
import morgan from "morgan"
import cors from "cors"
import "dotenv/config"
import indexRoutes from "./routes/index.routes.js"
import loginRoutes from "./routes/login.routes.js"
import usersRoutes from "./routes/users.routes.js"

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.use(indexRoutes)
app.use(loginRoutes)
app.use(usersRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log("http://localhost:" + PORT))
