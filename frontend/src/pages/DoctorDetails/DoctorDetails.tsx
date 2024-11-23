import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../lib/axios';
import { useNavigate } from 'react-router-dom';
const DoctorDetails = () => {
    const navigate=useNavigate();
  const { id } = useParams(); // Get the doctor ID from the URL parameters
  const [doctor, setDoctor] = useState<any>(null); // Store doctor details
  const [loading, setLoading] = useState<boolean>(false); // Handle loading state for appointment
  const [error, setError] = useState<string | null>(null); // Handle any errors from booking appointment

  // Fetch doctor data from API
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:5000/doctor/${id}`);
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    getData(); // Fetch data on component mount
  }, [id]); // Dependency array includes id to refetch when it changes

  // Handle the appointment booking action
 

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto bg-white shadow-xl rounded-lg my-10 min-h-screen">
        {doctor ? (
          <div>
            {/* Doctor Profile Header */}
            <div className="text-center mb-6">
              <h1 className="font-extrabold text-4xl text-blue-700">{doctor.name}</h1>
              <h2 className="text-xl font-semibold text-gray-600 mt-2">{doctor.specialization}</h2>
              <h3 className="text-lg text-gray-500 mt-1">{doctor.email}</h3>
            </div>

            {/* Doctor Info Section */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <h4 className="font-bold text-lg text-gray-700">About</h4>
                <p className="text-gray-500 text-lg">{doctor.bio || 'No bio available.'}</p>
              </div>

              {/* Contact Information */}
              <div className="flex justify-between">
                <h4 className="font-bold text-lg text-gray-700">Contact</h4>
                <p className="text-blue-600 text-lg">{doctor.phone || 'Not provided'}</p>
              </div>

              {/* Address */}
              <div className="flex justify-between">
                <h4 className="font-bold text-lg text-gray-700">Address</h4>
                <p className="text-gray-500 text-lg">{doctor.address || 'Not available'}</p>
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

            {/* Action Buttons */}
            <div className="mt-8 text-center">
              <button 
                onClick={() => navigate(`/appointment/${doctor._id}`)} 
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? 'Booking...' : 'Book an Appointment'}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-2xl text-gray-500">Loading doctor details...</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">&copy; 2024 5 Kilo Clinic. All Rights Reserved.</p>
          <p className="text-sm mt-2">Designed with ❤️ by Your Team.</p>
        </div>
      </footer>
    </>
  );
};

export default DoctorDetails;
