import express from "express";
import { getAllDoctors, getDoctorById, createPatient, getPatient, editDoctor} from "../controller/doctor.js";


const router = express.Router();

// Get all patients
router.get("/",  getAllDoctors);

// Get a specific patient by ID
router.get("/:id", getDoctorById);
// Example: Using the route parameter :doctorId
router.post('/addpatient/:doctorId', createPatient);
router.get("/getPatients/:id", getPatient);
router.put("/editDoctor/:id", editDoctor);



export default router;