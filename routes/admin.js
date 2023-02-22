import express from "express";
import upload from "../config/multerConfig.js";
import adminController from "../controllers/admin/adminController.js";
import categoryController from "../controllers/admin/categoryController.js";
import productController from "../controllers/admin/productController.js";
import adminMiddleware  from "../middleware/adminMiddleware.js";
const router = express.Router();

router.use(adminMiddleware);

//Admin Routes
router.get("/admin",adminController.dashboard);
//Category Rotes
router.get("admin/category", categoryController.allCategory);
router.get("admin/add-category",categoryController.addCategory);
router.post("admin/add-category", upload.single("categoryImg"),categoryController.storeCategory);
router.get("admin/edit-category/:id",categoryController.editCategory);
router.post("admin/edit-category/:id", upload.single("categoryImg"), categoryController.updateCategory);
router.get("admin/delete-category/:id", categoryController.deleteCategory);
//Products Routes
router.get("admin/products", productController.allProduct);
router.get("admin/add-product", productController.addProduct);
router.post("admin/add-product", upload.single("productImg"),productController.storeProduct);
router.get("admin/edit-product/:id", productController.editProduct);
router.post("admin/edit-product/:id", upload.single("productImg"),productController.updateProduct);
router.get("admin/delete-product/:id",productController.deleteProduct);


export default router;