import jwt from "jsonwebtoken";
const verifyAdmin = (req, res, next) => {
    const token = req.cookies?.auth_token;
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied." });
    }
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
        req.admin = {
            id: decoded.id,
            email: decoded.email,
            password: decoded.password,
            role: decoded.role,
        };
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid or expired token." });
    }
};
export default verifyAdmin;
