import mongoose from "mongoose";


export const connectDb = async function(){
    try{
         await mongoose.connect(process.env.MONGO_URI);
    }catch(error){
        console.log(`error ${error}`);
        process.exit(1); // process code 1 mean failure, 0 mean success

    }
}