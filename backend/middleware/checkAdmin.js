// import User from "../models/auth.js";


// export const adminStatus = async (req, res, next) => {
//     console.log('Request body:', req.body); // Debugging: Log the request body

//     const { username , password} = req.body;  // Access username from the body
//     if (!username) {
//         return res.status(400).json({ message: "Username is required" });
//     }

//     try {
//         // const currentUser = await User.findOne({ username });
        
//         // if (!currentUser) {
//         //     return res.status(404).json({ message: "User not found" });
//         // }

//         const isAdmin = process.env.ADMIN_USERNAME === username;
        
//         if (!isAdmin) {
//             return res.status(403).json({ message: "Unauthorized: must be an admin" });
//         }

//         next(); // Continue to the next middleware or route handler

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// };
// // Check if the user is an admin


// export const doctorStatus = async (req, res, next) => {
//     console.log('Request body:', req.body); // Debugging: Log the request body

//     const { username, password } = req.body;  // Access username from the body
//     if (!username) {
//         return res.status(400).json({ message: "Username is required" });
//     }

//     try {
      
//         const doctorsArray = process.env.DOCTORS ? process.env.DOCTORS.split(',') : [];

       
//         const isDoctor = doctorsArray.includes(username);

//         if (!isDoctor) {
//             return res.status(403).json({ message: "Unauthorized: must be a doctor" });
//         }

       
//         req.doctor = username;

//         next(); 

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// };
import User from "../models/auth.js"; // If you need to check the user from the database
import Doctor from "../models/doctor.js";
import bcrypt from "bcrypt"
export const adminStatus = async (req, res, next) => {
    console.log('Request body:', req.body); // Debugging: Log the request body

    const { username } = req.body;  // Access username from the body
    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }

    try {
        // Check if the username matches the admin username
        const isAdmin = process.env.ADMIN_USERNAME === username;

        if (!isAdmin) {
            return res.status(403).json({ message: "Unauthorized: must be an admin" });
        }

        // If the user is an admin, pass control to the next middleware
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// export const doctorStatus = async (req, res, next) => {
//     console.log('Request body:', req.body); // Debugging: Log the request body

//     const { username } = req.body;  // Access username from the body
//     if (!username) {
//         return res.status(400).json({ message: "Username is required" });
//     }

//     try {
//         // Assuming a list of doctors stored in process.env.DOCTORS (comma-separated)
//         const doctorsArray = process.env.DOCTORS ? process.env.DOCTORS.split(',') : [];

//         // Check if the username is in the list of doctors
//         const isDoctor = doctorsArray.includes(username);

//         if (!isDoctor) {
//             return res.status(403).json({ message: "Unauthorized: must be a doctor" });
//         }

//         // If the user is a doctor, pass control to the next middleware
//         next();
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// };
export const doctorStatus = async (req, res, next) => {
    const {username, password}=req.body;
    try{
        const user=await Doctor.findOne({username});
        if(!user){
            return res.status(404).json({message:"User not doctor"});
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }
        req.doctor=user._id;
        next();

    }
    catch(error){
        console.log(error);
      res.status(500).json({ message: error.message });

    }
    
}
