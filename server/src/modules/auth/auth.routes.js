import express from "express";
import { protectRoute, validate } from "../../middleware/auth.middleware.js";
import { checkAuth, login, logout, signup } from "./auth.controller.js";
import { loginValidator, signupValidator } from "./auth.validator.js";

const router = express.Router();


router.post("/signup",signupValidator,validate,signup);
router.post("/login",loginValidator,validate,login);
router.get("/checkauth",protectRoute,checkAuth);
router.post("/logout",logout);

export default router;