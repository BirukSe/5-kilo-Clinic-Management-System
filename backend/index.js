import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import patientRouter from "./routes/patient.js";
import doctorRouter from "./routes/doctor.js";
dotenv.config();
const app=express();

app.use(cors());
const PORT=process.env.PORT;
const connectToMongoDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    }
    catch(error){
        console.log(error);
    }
}
app.use(express.json());

app.use("/auth", authRouter);
app.use("/patient", patientRouter);
app.use("/doctor", doctorRouter);


app.listen(PORT, ()=>{
    connectToMongoDB();
    console.log(`Listening on port ${PORT}`);
})