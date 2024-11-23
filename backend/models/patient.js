import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name: String,
    email: String,
    diagnosis: String,
    illness: String,
});

export default mongoose.model("Patient", patientSchema);
