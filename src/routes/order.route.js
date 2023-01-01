const express = require("express");

const OrderController = require("../controllers/order.controller");

const OrderRouter = express.Router();

OrderRouter.get("/order/:orderId", OrderController.getOrderById); 

OrderRouter.post("/order/customer/:customerId", OrderController.createOrder); 

module.exports = OrderRouter;