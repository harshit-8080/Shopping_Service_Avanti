const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({

    customerId:{
        type:String,
        required:true
    },
    items:[
        {
            product:{
                _id:{type:String},
                name:{type:String},
                category:{type:String},
                brand:{type:String},
                price:{type:String}
            },
            unit:{type:Number,required:true}
        }
    ]
},{
    toJSON:{
        transform(doc,ret){
            delete ret.createdAt,
            delete ret.updatedAt,
            delete ret.__v
        }
    }
})

const CartModel = mongoose.model("CartSchema",CartSchema);

module.exports = CartModel