const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {
        // Ambil data
        const { username, password } = req.body;

        // Validasi
        if (!username || !password) {
            return res.status(400).json({
            success: false,
            message: "Username and password are required",
            });
        }

        // Cek apakah username sudah ada
        const [existingUsers] = await db.query(
            "SELECT id FROM users WHERE username = ?",
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

        const token = jwt.sign(
            {
                id: result.insertId,
                username,
            },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1h" }
        );

        // Response sukses
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
            id: result.insertId,
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

const login = async (req, res) => {
    try {
        // Ambil username dan password dari request body
        const { username, password } = req.body;

        // Validasi input
        if (!username || !password) {
            return res.status(400).json({
            success: false,
            message: "Username and password are required",
            });
        }

        // Cari user berdasarkan username
        const [results] = await db.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );
        const user = results[0];

        // Jika user tidak ditemukan
        if (!user) {
            return res.status(401).json({
            success: false,
            message: "Invalid credentials",
            });
        }

        // Cocokkan password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
            success: false,
            message: "Invalid credentials",
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
            },
                process.env.JWT_SECRET || "default_secret",
            {
                expiresIn: "1h",
            }
        );

        // Response sukses
        res.json({
            success: true,
            message: "Login successful",
            token,
        });
    } catch (error) {
        // Handle error database atau server
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

module.exports = {
    register,
    login
};