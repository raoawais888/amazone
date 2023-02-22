import express from "express";
import upload from "../config/multerConfig.js";
import vendorController from "../controllers/vendor/vendorController.js";

import vendorProductController from "../controllers/vendor/vendorProductController.js";
const router = express.Router();


//Admin Routes
router.get("/",vendorController.index);
//Products Routes
router.get("/products", vendorProductController.allProduct);
router.get("/add-product", vendorProductController.addProduct);
router.post("/add-product", upload.single("productImg"),vendorProductController.storeProduct);
router.get("/edit-product/:id", vendorProductController.editProduct);
router.post("/edit-product/:id", upload.single("productImg"),vendorProductController.updateProduct);
router.get("/delete-product/:id",vendorProductController.deleteProduct);


export default router;