const express = require( "express");
const  upload = require  ("../config/multerConfig.js");
const adminController = require("../controllers/admin/adminController.js");
const  categoryController = require ("../controllers/admin/categoryController.js");
const  productController =  require("../controllers/admin/productController.js");
const  orderController =  require("../controllers/admin/orderController.js");
const  adminMiddleware  = require ("../middleware/adminMiddleware.js");
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


// order routes
router.get("/orders",orderController.order);
router.get("/order_detail/:order",orderController.order_detail);



module.exports = router;