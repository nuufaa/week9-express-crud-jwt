const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// REGISTER
const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required",
            });
        }

        // Cek apakah username sudah ada
        const [existingUsers] = await db.query(
            "SELECT id_user FROM users WHERE username = ?",
            [username]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Username already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user baru
        const [result] = await db.query(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hashedPassword]
        );

        // Buat token JWT
        const token = jwt.sign(
            {
                id_user: result.insertId,
                username,
            },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1h" }
        );

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id_user: result.insertId,
                username,
                token,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

// LOGIN
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required",
            });
        }

        // Ambil data user
        const [results] = await db.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );

        const user = results[0];

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials (user not found)",
            });
        }

        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials (wrong password)",
            });
        }

        const token = jwt.sign(
            {
                id_user: user.id_user,
                username: user.username,
            },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1h" }
        );

        return res.json({
            success: true,
            message: "Login successful",
            token,
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

module.exports = { register, login };
