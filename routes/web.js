import express from "express";
import HomeController from "../controllers/HomeController.js";
import authController from "../controllers/authController.js"

const router = express.Router();

    router.get("/",HomeController.index);
    router.get("/about",HomeController.about);
    router.get("/product",HomeController.product);
    router.get("/why",HomeController.why);
    router.get("/testimonial",HomeController.testimonial);
    router.get("/register",authController.register);
    router.post("/register",authController.store);
    router.get("/login",authController.login);
    router.post("/login",authController.auth);


export default router;