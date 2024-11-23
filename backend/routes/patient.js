import express from "express";
import { editPatient, getAllPatients, getPatientById } from "../controller/patient.js";



const router = express.Router();

// Get all patients
router.get("/",  getAllPatients);

// Get a specific patient by ID
router.get("/:id", getPatientById);
router.put("/editPatient/:id", editPatient);


export default router;