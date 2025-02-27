import express from "express";
import {
    registerUser,
    loginUser,
    logout,
    getAllUsers,
    getUserById,
} from '../controllers/userController.js';

import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/user/all").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router.route("/user/me").get(isAuthenticatedUser, getUserById);

export default router;