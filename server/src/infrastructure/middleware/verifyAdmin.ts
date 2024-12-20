import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.auth_token;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN!) as JwtPayload;

    req.admin = {
      id: decoded.id as string,
      email: decoded.email as string,
      password: decoded.password as string,
      role: decoded.role as "admin",
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default verifyAdmin;
