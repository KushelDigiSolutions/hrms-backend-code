import { Router } from "express";
import { changePassword, login } from "../controller/authController.js";

const router = Router();

router.post("/login", login);

router.post("/changePassword", changePassword);

export default router;
