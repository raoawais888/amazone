import express from "express";
import upload from "../config/multerConfig.js";
import vendorController from "../controllers/vendorController.js";

import vendorProductController from "../controllers/vendorProductController.js";
const router = express.Router();

// router.use(adminMiddleware);

//Admin Routes
router.get("/vendor",vendorController.dashboard);
//Products Routes
router.get("/vendor/products", vendorProductController.allProduct);
router.get("/vendor/add-product", productController.addProduct);
router.post("/vendor/add-product", upload.single("productImg"),productController.storeProduct);
router.get("/vendor/edit-product/:id", productController.editProduct);
router.post("/vendor/edit-product/:id", upload.single("productImg"),productController.updateProduct);
router.get("/vendor/delete-product/:id",productController.deleteProduct);


export default router;