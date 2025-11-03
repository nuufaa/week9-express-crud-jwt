const jwt = require("jsonwebtoken");

/**
 * Middleware untuk autentikasi JWT Token
 * Dipakai untuk melindungi route yang membutuhkan login
 *
 * Header format:
 * Authorization: Bearer <token>
 */
const authenticateToken = (req, res, next) => {
    // Ambil header Authorization
    const authHeader = req.headers["authorization"];

    // Extract token dari header
    // Format: "Bearer <token>"
    const token = authHeader && authHeader.split(" ")[1];

    // Jika token tidak ada
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. Token required",
        });
    }

    // Verifikasi token
    jwt.verify(token,process.env.JWT_SECRET || "default_secret", (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Invalid or expired token",
            });
        }
        // Jika valid, simpan user ke req
        req.user = user;

        // Lanjut ke middleware/controller berikutnya
        next();
    });
};

module.exports = authenticateToken;
