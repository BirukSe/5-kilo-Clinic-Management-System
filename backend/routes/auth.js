import express from "express";
import { register, login, checkAdmin, checkDoctor, deleteDoctor, deletePatient } from "../controller/auth.js";
import { addDoctor } from "../controller/doctor.js";
import { adminStatus, doctorStatus } from "../middleware/checkAdmin.js";

const router = express.Router();

// Register route
router.post("/signup", register);

// Login route
router.post("/login", login);

// Check if the user is an admin
router.post("/check", adminStatus, checkAdmin);

// Check if the user is a doctor
router.post("/isdoctor", doctorStatus, checkDoctor);
router.delete("/deleteDoctor/:id", deleteDoctor);
router.delete("/deletePatient/:id", deletePatient);
router.post("/addDoctor", addDoctor);

export default router;
