import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import { Link } from 'react-router-dom';
import { Loading } from '../pages/Loading/Loading';

const Doctor = () => {
  const navigate = useNavigate();
  const { doctor, doctorId } = useAuthContext();
  const [patients, setPatients] = useState([]);
  const [special, setSpecial] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // To handle errors

  useEffect(() => {
    const fetchPatients = async () => {
      setIsLoading(true);
      try {
        console.log('doctor id', doctorId);
        const response = await fetch(`https://five-kilo-clinic-management-system-1.onrender.com/doctor/getPatients/${doctorId}`);
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
        setError('Failed to load patients data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    const fetchDoctor = async () => {
      try {
        const res = await axiosInstance.get(`/doctor/${doctorId}`);
        console.log(res);
        setSpecial(res.data.specialization);
        setName(res.data.name);
      } catch (error) {
        console.error('Error in fetching the doctor', error);
        setError('Failed to load doctor data. Please try again later.');
      }
    };

    fetchPatients();
    fetchDoctor();
  }, [doctorId]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Main content section */}
        <div className="bg-white shadow-md p-6 rounded-lg mt-10 mx-4">
          <h1 className="font-bold text-4xl text-blue-700">Dr. {name}</h1>
          <h2 className="font-bold text-xl text-gray-700 pt-4">Specialization: {special}</h2>
          <h2 className="font-bold text-lg text-gray-600">Username: {doctor}</h2>
          <h2 className="font-bold text-lg text-gray-600">Number of patients: {patients.length}</h2>
        </div>

        {/* Error message */}
        {error && (
          <div className="text-center text-red-500 mt-5">
            <p>{error}</p>
          </div>
        )}

        {/* Patients List Section */}
        <div className="shadow-md h-auto pt-7 flex-grow mx-4 mt-6 bg-white p-6 rounded-lg">
          <h1 className="font-bold text-3xl text-gray-800 mb-4">Patients List</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Diagnosis</th>
                  <th className="py-3 px-4 text-left">Illness</th>
                  <th className="py-3 px-4 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                {/* Map through the patients array and display their details */}
                {patients.map((patient, index) => (
                  <tr key={patient._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{patient.name}</td>
                    <td className="py-3 px-4">{patient.diagnosis}</td>
                    <td className="py-3 px-4">{patient.illness}</td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/details/${patient._id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={() => navigate('/addpatient')}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Patient
          </button>
        </div>
        </div>

        {/* Add Patient Button */}
       

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6 mt-auto">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm">&copy; 2024 5 Kilo Clinic. All Rights Reserved.</p>
            <p className="text-sm mt-2">Designed with ❤️ by Your Team.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Doctor;
