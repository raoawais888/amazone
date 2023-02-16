import express from "express";
import HomeController from "../controllers/HomeController.js";

const router = express.Router();

    router.get("/",HomeController.index);
    router.get("/about",HomeController.about);
    router.get("/product",HomeController.product);
    router.get("/why",HomeController.why);
    router.get("/testimonial",HomeController.testimonial);


export default router;