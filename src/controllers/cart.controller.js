const { OrderModel, CartModel } = require("../models");

exports.getCartByCustomerId = async (req, res) => {

    try { 

        const cart = await CartModel.find({customerId:req.params.customerId});

        if(!cart){
            return res.json({
                "msg":"internal server error"
            })
        }
        return res.json({
            "response":cart
        })
        
    } catch (error) {
        
        console.log(error);
        return res.json({
            "msg":"internal server error"
        })
    }
}

exports.addToCart = async(req, res) => {

    try {
        
        // console.log("kkkkk");
        const product = {
            _id:req.body.productId,
            name:req.body.name,
            category:req.body.category,
            brand:req.body.brand,
            price:req.body.price
        }
        const unit = req.body.unit;

        const cart = await CartModel.findOne({customerId:req.params.customerId});
        if(!cart){
            console.log("jjjj");
            const cart = {
                customerId:req.params.customerId,
                items:[
                    {
                        product:product,
                        unit:unit
                    }
                ]
            }
            const response = await CartModel.create(cart);
            return res.json({
                "response":response
            })
        }


     
        if(cart.items.length > 0){
                
            let exitFood = false;
            cart.items.forEach((p)=>{
                if(p.product._id == product._id){
                    console.log("if");
                    if(unit > 0){
                        p.unit = unit;
                    }else{
                        cart.items.remove(p);
                    }
                    exitFood = true;        
                }
            })
            if(!exitFood){
                console.log("else ");
                cart.items.push({product:product,unit:unit});
            }
        }
        else{
            cart.items.push({product:product,unit:unit});
        }

        await cart.save();

        return res.json({
            "success":true,
            "response":cart.items
        })

    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })
    }
    
}

exports.getAllCarts = async (req, res) => {

    try { 

        const cart = await CartModel.find();

        if(!cart){
            return res.json({
                "msg":"internal server error"
            })
        }
        return res.json({
            "response":cart
        })
        
    } catch (error) {
        
        console.log(error);
        return res.json({
            "msg":"internal server error"
        })
    }
}