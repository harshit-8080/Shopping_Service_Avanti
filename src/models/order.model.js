const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({

    orderId:{
        type:String,
        required:true
    },
    CustomerId:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    status:{
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

const OrderModel = mongoose.model("OrderModel",OrderSchema);

module.exports = OrderModel;