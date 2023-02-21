import express from "express";
import upload from "../config/multerConfig.js";
import HomeController from "../controllers/HomeController.js";
import authController from "../controllers/authController.js";
import adminController from "../controllers/admin/adminController.js";
import categoryController from "../controllers/admin/categoryController.js";
import productController from "../controllers/admin/productController.js";
import {checkLogin,isLogin, isAdmin} from "./middleware.js";

const router = express.Router();

router.get("/", HomeController.index);
router.get("/about", HomeController.about);
router.get("/product", HomeController.product);
router.get("/why", HomeController.why);
router.get("/testimonial", HomeController.testimonial);
router.get("/register", isLogin, authController.register);
router.post("/register", authController.store);
router.get("/login", isLogin, authController.login);
router.post("/login", authController.auth);
router.get("/logout", authController.logout);
router.get("/dashboard", checkLogin, HomeController.dashboard);

//Admin Routes
router.get("/admin", checkLogin, isAdmin, adminController.dashboard);
//Category Rotes
router.get("/category",checkLogin, isAdmin, categoryController.allCategory);
router.get("/add-category",checkLogin, isAdmin, categoryController.addCategory);
router.post("/add-category", upload.single("categoryImg"),categoryController.storeCategory);
router.get("/edit-category/:id",checkLogin, isAdmin, categoryController.editCategory);
router.post("/edit-category/:id", upload.single("categoryImg"), categoryController.updateCategory);
router.get("/delete-category/:id",checkLogin, isAdmin, categoryController.deleteCategory);
//Products Routes
router.get("/products",checkLogin, isAdmin, productController.allProduct);
router.get("/add-product",checkLogin, isAdmin, productController.addProduct);
router.post("/add-product", upload.single("productImg"),productController.storeProduct);
router.get("/edit-product/:id",checkLogin, isAdmin, productController.editProduct);
router.post("/edit-product/:id", upload.single("productImg"),productController.updateProduct);
router.get("/delete-product/:id",checkLogin, isAdmin, productController.deleteProduct);
export default router;
