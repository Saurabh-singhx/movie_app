import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { validationResult } from "express-validator";

export const protectRoute = async (req, res, next) => {

    try {

        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Try loging in" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "unauthorize - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("error in protectRoute", error.message);
        return res.status(500).json({ message: "User not found" });
    }
}

export const validate = (req,res,next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = {};

    for (const err of errors.array()) {
      if ("path" in err) {
        const fieldError = err ;

        if (!formattedErrors[fieldError.path]) {
          formattedErrors[fieldError.path] = fieldError.msg;
        }
      }
    }

    res.status(400).json({
      success: false,
      errors: formattedErrors,
    });
    
    return;
  }

  next();
};

export const AdminprotectRoute = async (req, res, next) => {

    try {

        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Try loging in" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "unauthorize - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if( ! user || user.user_role !== 'ADMIN'){
            return res.status(401).json({ message: "UNAUTHORIZE user" });
        }
        req.user = user;

        next();
    } catch (error) {
        console.log("error in protectRoute", error.message);
        return res.status(500).json({ message: "internal server error" });
    }
}