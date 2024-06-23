const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userDetailcontroller = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const uploadProcuctController = require("../controller/product/uploadProduct");
const getproductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProduct = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCart");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
const addToCartProductView = require("../controller/user/addToCartProductView");
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartproduct");
const searchProduct = require("../controller/product/searchProduct");
const filterCategoryController = require("../controller/product/filterProduct");
const paymentController = require("../controller/order/paymentController");
const webhooks = require("../controller/order/webhook");
const orderController = require("../controller/order/order.controller");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken,userDetailcontroller);
router.get("/userlogout", userLogout);

// Admin panel 

router.get("/all-user",authToken,allUsers);
router.post("/update-user",authToken,updateUser);

//  Product

router.post("/upload-product",authToken,uploadProcuctController);
router.get("/get-product",getproductController);
router.post("/update-product",authToken,updateProductController);
router.get("/get-category",getCategoryProduct);
router.post("/category-product",getCategoryWiseProduct);
router.post("/product-details",getProductDetails);
router.get("/search",searchProduct);
router.post("/filter-product",filterCategoryController);

// Add To Cart Product

router.post("/addtocart",authToken,addToCartController);
router.get("/countAddToCartProduct",authToken,countAddToCartProduct);
router.get("/view-cart-product",authToken,addToCartProductView);
router.post("/update-cart-product",authToken,updateAddToCartProduct);
router.post("/delete-cart-product",authToken,deleteAddToCartProduct);

// payment and order 

router.post("/checkout",authToken,paymentController);
router.post("/webhook",webhooks);  //api/webhook
router.get("/order-list",authToken,orderController);  



module.exports = router;
