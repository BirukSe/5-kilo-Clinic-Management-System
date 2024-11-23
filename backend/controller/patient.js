import mongoose from "mongoose";
import Patient from "../models/patient.js";
export const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }


}
export const getPatientById = async (req, res) => {
    try {
        const patientId = req.params.id;
        const patient = await Patient.findById(patientId);
        res.status(200).json(patient);
    } catch (error) {
        res.status(404).json({ message: "hi" });
    }
}
export const editPatient=async(req, res)=>{
    try{
        const patientId=req.params.id;
        const patientData=req.body;
        await Patient.findByIdAndUpdate(patientId, patientData);
        res.status(200).json({message:"Patient updated"})

    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}
