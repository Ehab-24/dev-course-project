import express from "express";
import * as controllers from "../controllers/auth";

// create a new express router
const router = express.Router();

// define all routes
router.post("/register", controllers.register);
router.post("/login", controllers.login);

export default router;
