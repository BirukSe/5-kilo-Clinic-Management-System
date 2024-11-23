import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../lib/axios.ts'; // Assuming axiosInstance is set up correctly
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons from react-icons
import { useToast } from "../hooks/use-toast"
import { ToastAction } from "../components/ui/toast"
import { Button } from '../components/ui/button.tsx';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../pages/Loading/Loading.tsx';
import { set } from 'react-hook-form';
const Admin = () => {
  const navigate=useNavigate();
  const [loading, setLoading] = useState(true);
  let count=1;
  let docCount=1;
  const { toast } = useToast();
  const [array, setArray] = useState([
    { id: 1, name: "John Doe", condition: "Flu" },
    { id: 2, name: "Jane Smith", condition: "Back Pain" },
    { id: 3, name: "Samuel Adams", condition: "Cold" },
  ]);

  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Emily Johnson", specialization: "Cardiology" },
    { id: 2, name: "Dr. Sarah Smith", specialization: "Dentistry" },
    { id: 3, name: "Dr. Michael Brown", specialization: "Orthopedics" },
  ]);

  const [patientClicked, setPatientClicked] = useState(false);
  const [doctorClicked, setDoctorClicked] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/patient');
        console.log(response.data);
        setArray(response.data); 
        const res=await axiosInstance.get('/doctor');
        console.log(res.data);
        setDoctors(res.data);
        // Update the state with the fetched patients data
      } catch (err) {
        console.log("Error fetching patients data:", err);
      }finally{
        setLoading(false);
      }
    }

    getData();

    return () => {};
  }, []);

  // Edit and delete handlers (you can customize these handlers)
  const handleEdit = (id) => {
    setLoading(true);
    try{
      console.log('Edit patient with id:', id);
    navigate(`/editDoctor/${id}`);

    }
    catch(error){
      console.log("Error deleting patient:", error);
    }finally{
      setLoading(false);
    }
    
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      // Send DELETE request to the backend
      const response = await axiosInstance.delete(`/auth/deleteDoctor/${id}`);
      console.log('Doctor deleted:', response.data);
  
      // Remove doctor from the local state after successful deletion
      setDoctors(doctors.filter(doctor => doctor.id !== id));
  
      // Show toast notification and log to verify
      console.log("Showing toast...");
      toast({
        variant: "destructive",
        title: "Doctor deleted successfully",
        description: "The doctor has been deleted.",
        action: <ToastAction altText="Try again">Deleted</ToastAction>,
      });
    } catch (err) {
      console.log("Error deleting doctor:", err);
  
      // Show toast notification on error
      toast({
        variant: "destructive",
        title: "Error deleting doctor",
        description: "There was an issue deleting this doctor. Please try again.",
      });
    }finally{
      setLoading(false);
    }
  };
  const handlePatientDelete=async(id)=>{
    setLoading(true);
    try{
      console.log('Delete patient with id:', id);
      const response = await axiosInstance.delete(`/auth/deletePatient/${id}`);
      console.log('Patient deleted:', response.data);
      setArray(array.filter(patient => patient.id !== id));
    }
    catch(error){
      console.log("Error deleting patient:", error);
    }finally{
      setLoading(false);
    }
  }
  const handlePatientEdit=(id)=>{
    try{
      setLoading(true);
      console.log('Edit patient with id:', id);
      navigate(`/editPatient/${id}`);

    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }
  
  }
  

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="font-extrabold text-5xl text-custom-blue mt-4">Admin Dashboard</h1>

      <div className="flex flex-row justify-between">
        {/* Total Patients Section */}
        <div
          id="patient"
          className={`shadow-md h-60 flex-grow pt-8 pl-8 cursor-pointer ${patientClicked ? 'bg-orange-500' : 'hover:bg-custom-blue'}`}
          onClick={() => setPatientClicked(!patientClicked)}
        >
          <h1 className="font-bold text-3xl">Total Patients</h1>
          <p className="text-2xl">{array.length}</p>
        </div>

        <div
          id="doctor"
          className={`shadow-md h-60 flex-grow pt-8 pl-8 cursor-pointer ${doctorClicked ? 'bg-orange-500' : 'hover:bg-custom-blue'}`}
          onClick={() => setDoctorClicked(!doctorClicked)}
        >
          <h1 className="font-bold text-3xl">Total Doctors</h1>
          <p className="text-2xl">{doctors.length}</p>
        </div>
      </div>

      {/* Patient List */}
      {patientClicked && (
        <div className="mt-4 p-4 bg-yellow-500 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Patient List</h2>
          
          <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Condition</th>
                <th className="py-3 px-4 text-left">Actions</th> {/* New column for actions */}
              </tr>
            </thead>
            <tbody>
              {array.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{count++}</td>
                  <td className="py-3 px-4">{patient.name}</td>
                  <td className="py-3 px-4">{patient.illness}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-4">
                      {/* Edit Icon */}
                      <FaEdit 
                        className="text-blue-500 cursor-pointer" 
                        onClick={() => handlePatientEdit(patient._id)} 
                      />
                      {/* Delete Icon */}
                      <FaTrash 
                        className="text-red-500 cursor-pointer" 
                        onClick={() => handlePatientDelete(patient._id)} 
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Doctor List */}
      {doctorClicked && (
        <div className="mt-4 p-4 bg-yellow-500 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Doctor List</h2>
          <Button onClick={() => navigate("/add-doctor")}>Add New Doctor</Button>
          <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Specialization</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{docCount++}</td>
                  <td className="py-3 px-4">{doctor.name}</td>
                  <td className="py-3 px-4">{doctor.specialization}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-4">
                      {/* Edit Icon */}
                      <FaEdit 
                        className="text-blue-500 cursor-pointer" 
                        onClick={() => handleEdit(doctor._id)} 
                      />
                      {/* Delete Icon */}
                      <FaTrash 
                        className="text-red-500 cursor-pointer" 
                        onClick={() => handleDelete(doctor._id)} 
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">
            &copy; 2024 5 Kilo Clinic. All Rights Reserved.
          </p>
          <p className="text-sm mt-2">
            Designed with ❤️ by Your Team.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Admin;
