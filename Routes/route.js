const express = require('express')
const productController = require('../Controllers/productController')
const userController = require('../Controllers/userController')
const router = new express.Router()
const wishlistController = require('../Controllers/wishlistController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const cartController = require('../Controllers/cartController')


// get all products\
router.get('/all-products', productController.getAllProducts)

// register
router.post('/user/register', userController.register)

// login
router.post('/user/login', userController.login)

// getting a product
router.get('/product/:id', productController.getProduct)

// wishlist
router.post('/wishlist', jwtMiddleware, wishlistController.addWishlist)

// get a wishlist item
router.get('/get-wishlist', jwtMiddleware, wishlistController.getWishlists)

router.delete('/delete-wishlist/:id', jwtMiddleware, wishlistController.deleteFromWishlist)

// add to cart
router.post('/add-cart', jwtMiddleware, cartController.addToCart)

// get to cart
router.get('/get-cart', jwtMiddleware, cartController.getToCart)

// delete from cart
router.delete('/delete-cart/:id', jwtMiddleware, cartController.deletefromCart)

// decrement from cart
router.post('/decrement-cart/:id', jwtMiddleware, cartController.decrementFromCart);


module.exports = router