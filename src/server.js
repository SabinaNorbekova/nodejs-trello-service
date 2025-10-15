// server.js
import express from "express"
import dotenv from "dotenv"
import mainRouter from "./routes/index.js"
import { errorHandler } from "./middleware/errorHandler.js"
import morgan from "morgan"


dotenv.config()

const app = express()
app.use(morgan("dev"))
app.use(express.json())

app.use("/", mainRouter)


app.use(errorHandler)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

