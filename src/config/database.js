// config/database.js
import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const { Pool } = pg

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "trello_project",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "root",
  port: process.env.DB_PORT || 5432,
})

export default pool