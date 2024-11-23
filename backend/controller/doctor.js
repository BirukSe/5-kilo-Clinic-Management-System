import mongoose from "mongoose";
import Doctor from "../models/doctor.js";
import Patient from "../models/patient.js";  // Import the Patient model
import bcrypt from "bcrypt";
// Get all doctors
export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }   
}

// Add a new doctor
// Import bcrypt

export const addDoctor = async (req, res) => {
    const { name, username, email, password, specialization } = req.body;

   
    if (!name || !email || !password || !username) {
        return res.status(400).json({ message: 'Name, email, password, and username are required' });
    }

    try {
       
        const existingDoctor = await Doctor.findOne({ username });
        if (existingDoctor) {
            return res.status(409).json({ message: 'Doctor with this username already exists' });
        }

        
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

       
        const newDoctor = new Doctor({
            name,
            username,
            email,
            password: hashedPassword, 
            specialization
        });

       
        await newDoctor.save();

        // Send the response with status 201 (Created) and the saved doctor data
        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get a doctor by ID
export const getDoctorById = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const doctor = await Doctor.findById(doctorId).populate('patients');  // populate the patients field
        res.status(200).json(doctor);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Create a patient and associate it with a doctor
export const createPatient = async (req, res) => {
    const patientData = req.body;  // Patient data from the request
    const doctorId = req.params.doctorId.trim(); 
     // Doctor's ID from the URL parameter

    try {
        const doctor = await Doctor.findById(new mongoose.Types.ObjectId(doctorId));
        if (!doctor) {
            return res.status(404).json({ message:  "doc not found"});
        }

        // Create the new patient
        const newPatient = new Patient(patientData);
        await newPatient.save();  // Save the new patient to the database

        // Associate the patient with the doctor by pushing the patientId to the doctor's patients array
        doctor.patients.push(newPatient._id);
        await doctor.save();

        res.status(201).json(newPatient);  // Send the created patient in the response
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const getPatient = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the doctor by ID and populate the 'patients' field with the actual patient documents
        const doctor = await Doctor.findById(id).populate('patients'); // populate the patients field

        // If the doctor is not found, return a 404 error
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Return the full patient data (not just IDs)
        res.status(200).json(doctor.patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const editDoctor=async (req, res)=>{
    const { id } = req.params;
    const { name, email, specialization, username } = req.body;
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, { name, email, specialization, username }, { new: true });
    res.status(200).json(updatedDoctor);
}

