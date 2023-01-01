const { OrderModel, CartModel } = require("../models");
const { v4: uuidv4 } = require('uuid');

exports.getOrderById = async(req, res) => {

    try {
        
        const order = await OrderModel.findById(req.params.orderId);

        if(!order){
            return res.json({
                "msg":"No Order Found"
            })
        }

        return res.json({
            "response":order
        })
    } catch (error) {
        
        console.log(error);
        return res.json({
            "msg":"internal server error"
        })
    }
}

exports.createOrder = async(req, res) => {

    try {
        
        const cart = await CartModel.findOne({customerId:req.params.customerId});

        if(!cart || cart.items.length <= 0){
            return res.json({
                "response":"Your Cart is Empty"
            })
        }
        
        let amount = 0;

        cart.items.map((i)=>{
            amount = amount + (i.product.price * i.unit);
        })

        const order = {
            orderId:uuidv4(),
            CustomerId:req.params.customerId,
            amount:amount,
            status:"pending",
            items:cart.items
        }

        const response = await OrderModel.create(order);
        cart.items = [];
        await cart.save();

        return res.json({
            "response":response
        })


    } catch (error) {
        
        console.log(error);
        return res.json({
            "msg":"internal server error"
        })
    }
}