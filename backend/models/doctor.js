import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    username: String,
    specialization: String,
    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }]
});

export default mongoose.model("Doctor", doctorSchema);