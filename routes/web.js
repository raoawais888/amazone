import express from "express";
import passport from "passport";
import HomeController from "../controllers/HomeController.js";
import authController from "../controllers/authController.js";
import cartController from "../controllers/cartController.js";
import ensureAuthenticated from "../middleware/googleAuthMiddleware.js"



const router = express.Router();
router.get("/", HomeController.index);
router.get("/about", HomeController.about);
router.get("/product", HomeController.product);
router.get("/product-detail/:id", HomeController.product_detail);
router.get("/why", HomeController.why);
router.get("/testimonial", HomeController.testimonial);
router.get("/cart", cartController.index);
router.post("/add-cart", cartController.cart);
router.post("/update-cart", cartController.updateCart);
router.post("/delete_Cart", cartController.deleteCart);
router.get("/checkout", cartController.checkout);

router.get("/register", authController.register);
router.post("/register", authController.store);
router.get("/login",authController.login);
router.post("/login", authController.auth);// Logout route




// Initiates the Google OAuth2 authentication process
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// Completes the Google OAuth2 authentication process
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to the home page
    res.redirect('/vendor');
  });


  router.get('/dashboard', ensureAuthenticated, (req, res) => {
    // This route requires authentication
    res.render('dashboard');
  });
export default router;
