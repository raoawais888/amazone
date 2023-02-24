import express from "express";
import HomeController from "../controllers/HomeController.js";
import authController from "../controllers/authController.js";
import cartController from "../controllers/cartController.js";



const router = express.Router();
router.get("/", HomeController.index);
router.get("/about", HomeController.about);
router.get("/product", HomeController.product);
router.get("/product-detail/:id", HomeController.product_detail);
router.get("/why", HomeController.why);
router.get("/testimonial", HomeController.testimonial);
router.post("/search", HomeController.search);
router.get("/add-cart/:id", cartController.cart);

router.get("/register", authController.register);
router.post("/register", authController.store);
router.get("/login",authController.login);
router.post("/login", authController.auth);
router.get("/logout", authController.logout);
export default router;
