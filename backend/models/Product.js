import mongoose, { model } from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{
    timestamps:true //createdAt, updatedAt
})

const Product = new mongoose.model("Product",productSchema);

export default Product;