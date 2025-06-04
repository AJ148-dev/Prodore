import Product from "../models/Product.js"
import mongoose from "mongoose";


export const getProducts = async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({
        success:true,
        data: products
    })
    }catch(error){
        console.log("Error for displaying all products:"+ error);
        res.status(404).json({
            success:false,
            message:"There is an error displaying in all products"
        })
    }
}

export const createProduct = async (req, res) => {
  try {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
      return res.status(400).json({
        success: false,
        message: "Please provide full details",
      });
    }

    const newProduct = new Product(product);
    await newProduct.save();

    return res.status(201).json({
      success: true,
      data: newProduct,
    });

  } catch (error) {
    console.error("Error in createProduct:", error); // log the error
    return res.status(500).json({
      success: false,
      message: "Server error while creating product",
    });
  }
};


export const updateProduct = async(req,res)=>{
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            success:false,
            message:"Invalid product Id"
        })
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new : true});
        res.status(200).json({
            success:true,
            data:updatedProduct,
            message: "Product updated successfully"
        })
    }catch(error){
        console.log("Error in updating the product" + error);
        res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}

export const deleteProduct = async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            success:false,
            message:"Invalid product Id"
        })
    }
    
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
        })
    }catch(error){
        console.log("There is an error in deleting the product");
        res.status(500).json({
            success:false,
            message: "Server Error"
        })
    }
}