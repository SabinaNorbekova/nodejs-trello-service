//auth.controller.js
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import pool from "../config/database.js"
import { registerSchema, loginSchema } from "../validation/users.validation.js"

export const loginUser = async (req, res, next) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message })

        const { email, password } = req.body;

        const result = await pool.query("SELECT * FROM users WHERE email=$1", [email])
        if (result.rows.length === 0)
            return res.status(404).json({ message: "User not found" })

        const user = result.rows[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: "Invalid credentials" })

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.json({ message: "Login successful", token })
    } catch (err) {
        next(err)
    }
}


export const registerUser = async (req, res, next) => {
    try {
        const { error } = registerSchema.validate(req.body)
        if (error) return res.status(400).json({ message: error.details[0].message })

        const { name, email, password } = req.body

        const userExist = await pool.query("SELECT * FROM users WHERE email=$1", [email])
        if (userExist.rows.length > 0)
            return res.status(400).json({ message: "Email already registered" })

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await pool.query(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email`,
            [name, email, hashedPassword]
        )

        res.status(201).json({
            message: "User registered successfully",
            user: result.rows[0],
        });
    } catch (err) {
        next(err)
    }
}



