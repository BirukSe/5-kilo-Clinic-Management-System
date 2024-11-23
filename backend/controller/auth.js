import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/auth.js";
import dotenv from "dotenv";
import Patient from "../models/patient.js";
import Doctor from "../models/doctor.js";
dotenv.config();

export const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ name, email, password: hashedPassword, username });
        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User doesn't exist" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ result: user, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}
export const checkAdmin=async (req, res)=>{
    res.status(200).json({admin: true});


}
export const checkDoctor=async (req, res)=>{
    res.status(200).json({doctor: true,  user: req.doctor});
}
export const deletePatient = async (req, res) => {
    const id=req.params.id;

    try {
        // Find the patient that is being deleted
        const patient = await Patient.findById(new mongoose.Types.ObjectId(id));
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Remove the patient's ID from the related doctor's 'patients' array
        await Doctor.updateOne(
            { patients: id },  // Find the doctor who has this patient ID in their 'patients' array
            { $pull: { patients: id } }  // Pull (remove) the patient ID from the 'patients' array
        );

        // Delete the patient from the database
        await Patient.findByIdAndDelete(id);

        res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteDoctor=async (req, res)=>{
    const id=req.params.id;
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({message:"Doctor deleted"})
}