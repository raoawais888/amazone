const express =  require("express");
const passport =  require("passport");
const HomeController =  require("../controllers/HomeController.js");
const authController =  require("../controllers/authController.js");
const cartController =  require("../controllers/cartController.js");
const ensureAuthenticated =  require("../middleware/googleAuthMiddleware.js");
const checkoutController =  require("../controllers/checkoutController.js");



const router = express.Router();
router.get("/", HomeController.index);
router.get("/about", HomeController.about);
router.get("/product", HomeController.product);
router.get("/product-detail/:id", HomeController.product_detail);
router.get("/why", HomeController.why);
router.get("/testimonial", HomeController.testimonial);
router.get("/privacy-policy", HomeController.privacy);
router.get("/order", HomeController.order);
router.get("/cart", cartController.index);
router.post("/add-cart", cartController.cart);
router.post("/update-cart", cartController.updateCart);
router.post("/delete_Cart", cartController.deleteCart);
router.get("/checkout", cartController.checkout);
router.post("/checkout", checkoutController.checkout);
router.get("/send", cartController.send);

router.get("/register", authController.register);
router.post("/register", authController.store);
router.get("/login",authController.login);
router.post("/login", authController.auth);// Logout route
router.post("/logout", authController.logout);// Logout route




// Initiates the Google OAuth2 authentication process
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// Completes the Google OAuth2 authentication process
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {

    // Successful authentication, redirect to the home page
    res.redirect('/');
  });


  router.get('/dashboard', ensureAuthenticated, (req, res) => {
    // This route requires authentication
    res.render('dashboard');
  });
module.exports = router ;
