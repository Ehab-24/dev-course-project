import express from "express";
import * as controllers from "../controllers/auth.js";

// create a new express router
const router = express.Router();

// define all routes
router.post("/register", controllers.register);
router.post("/login", controllers.login);
router.get("/users", controllers.getAllUsers);

export default router;
