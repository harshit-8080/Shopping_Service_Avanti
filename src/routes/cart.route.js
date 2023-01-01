const express = require("express");

const CartController = require("../controllers/cart.controller");

const CartRouter = express.Router();

CartRouter.get("/cart/customer/:customerId", CartController.getCartByCustomerId); 

CartRouter.post("/cart/customer/:customerId", CartController.addToCart); 

CartRouter.get("/carts", CartController.getAllCarts); 

module.exports = CartRouter;