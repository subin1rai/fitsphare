import express from "express";
const router = express.Router();
import { register, personalize, login ,logout} from "../controller/auth.controller.js";
import { auth } from "../middleware/authMiddleware.js";
import {upload} from "../middleware/uploadMiddleWare.js";


router.post("/register", register);
router.put("/personalize",auth,upload.single("photo"), personalize);
router.post("/login", login);
router.get("/logout", logout);
// router.get("/me", authMiddleware, me);
export default router;