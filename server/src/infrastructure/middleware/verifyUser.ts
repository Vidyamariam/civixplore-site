import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../domain/interfaces/User.js";

export const verifyUser = (roles: User["role"][] = []) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      res.status(401).json({ message: "Token is missing or invalid" });
      return;
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET_USER!
      ) as { id: string; role: User["role"] };

      if (roles.length && !roles.includes(decoded.role)) {
        res.status(403).json({ message: "Unauthorized access" });
        return;
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};
