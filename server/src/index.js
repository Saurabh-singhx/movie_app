import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser  from "cookie-parser";
import { ConnectDB } from "./lib/db.js";
import authRoutes from "./modules/auth/auth.routes.js"
import userRoutes from "./modules/user/user.routes.js"
import adminRoutes from "./modules/admin/admin.routes.js"
const app = express();
dotenv.config();


const PORT = process.env.PORT;

app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({limit:"10mb",extended:true}));
app.use(cookieParser());


app.use(cors({
    origin: ["http://localhost:5173",process.env.FRONTEND_URL],

    credentials:true,
}));

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/admin",adminRoutes);


app.listen(PORT,async()=>{
    await ConnectDB();
    console.log(`server is running on port : ${PORT}`);
})


