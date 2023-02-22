import express from "express";
import upload from "../config/multerConfig.js";
import adminController from "../controllers/admin/adminController.js";
import categoryController from "../controllers/admin/categoryController.js";
import productController from "../controllers/admin/productController.js";
import adminMiddleware  from "../middleware/adminMiddleware.js";
const router = express.Router();

router.use(adminMiddleware);

//Admin Routes
router.get("/",adminController.dashboard);
//Category Rotes
router.get("/category", categoryController.allCategory);
router.get("/add-category",categoryController.addCategory);
router.post("/add-category", upload.single("categoryImg"),categoryController.storeCategory);
router.get("/edit-category/:id",categoryController.editCategory);
router.post("/edit-category/:id", upload.single("categoryImg"), categoryController.updateCategory);
router.get("/delete-category/:id", categoryController.deleteCategory);
//Products Routes
router.get("/products", productController.allProduct);
router.get("/add-product", productController.addProduct);
router.post("/add-product", upload.single("productImg"),productController.storeProduct);
router.get("/edit-product/:id", productController.editProduct);
router.post("/edit-product/:id", upload.single("productImg"),productController.updateProduct);
router.get("/delete-product/:id",productController.deleteProduct);


export default router;