import express from "express";
import dotenv from "dotenv"
import path from "path"
import { connectDb } from "./config/db.js";
import productRoutes from "./routes/product.js"


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
app.use(express.json()); 

app.use('/api/products',productRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}
//Test


app.listen(5000,()=>{
    connectDb();
    console.log("Server is Listening on Port"+ PORT);
})