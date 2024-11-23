// import React, { useEffect, useState } from 'react';
// import { FaEdit, FaSave } from 'react-icons/fa'; // Added FaSave for save button
// import { useParams } from 'react-router-dom';
// import { useAuthContext } from '../../context/AuthContext';
// import { axiosInstance } from '../../lib/axios';

// const Details = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [condition, setCondition] = useState('');
//   const [diagnosis, setDiagnosis] = useState('');
//   const [isConditionEditable, setIsConditionEditable] = useState(false); // State for condition editing
//   const [isDiagnosisEditable, setIsDiagnosisEditable] = useState(false); // State for diagnosis editing
//   const { doctorId } = useAuthContext();
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchPatient = async () => {
//       try {
//         const response = await axiosInstance.get(`http://localhost:5000/patient/${id}`);
//         setName(response.data.name);
//         setEmail(response.data.email);
//         setCondition(response.data.illness);
//         setDiagnosis(response.data.diagnosis);
//       } catch (error) {
//         console.error("Error fetching patient data:", error);
//       }
//     };
//     fetchPatient();
//   }, [id]);

//   // Handle condition save
//   const handleSaveCondition = async () => {
//     try {
//       const response = await axiosInstance.put(`http://localhost:5000/patient/editPatient/${id}`, {
//         illness: condition,
//       });
//       console.log("Updated condition:", response.data);
//       setIsConditionEditable(false); // Disable editing after save
//     } catch (error) {
//       console.error("Error updating condition:", error);
//     }
//   };

//   // Handle diagnosis save
//   const handleSaveDiagnosis = async () => {
//     try {
//       const response = await axiosInstance.put(`http://localhost:5000/patient/editPatient/${id}`, {
//         diagnosis: diagnosis,
//       });
//       console.log("Updated diagnosis:", response.data);
//       setIsDiagnosisEditable(false); // Disable editing after save
//     } catch (error) {
//       console.error("Error updating diagnosis:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col">
//       <h1 className="font-extrabold text-3xl mt-5">Patient's Name: {name}</h1>
//       <h1 className="font-extrabold text-3xl mt-5">Patient's Email: {email}</h1>

//       {/* Condition section */}
//       <div className="flex items-center mt-4">
//         <h2 className="font-bold text-2xl">Condition:</h2>
//         <FaEdit
//           className="ml-2 text-blue-500 cursor-pointer text-3xl hover:text-blue-700"
//           onClick={() => setIsConditionEditable(true)}
//         />
//       </div>
//       <div
//         id="condition"
//         className="border-2 border-slate-500 ml-28 mr-28 mt-2 h-32 p-2"
//       >
//         {isConditionEditable ? (
//           <>
//             <textarea
//               value={condition}
//               onChange={(e) => setCondition(e.target.value)}
//               className="w-full h-full"
//             />
//             <FaSave
//               className="ml-2 text-green-500 cursor-pointer text-2xl hover:text-green-700"
//               onClick={handleSaveCondition}
//             />
//           </>
//         ) : (
//           condition
//         )}
//       </div>

//       {/* Diagnosis section */}
//       <div className="flex items-center mt-5">
//         <h1 className="font-extrabold text-3xl">Diagnosis:</h1>
//         <FaEdit
//           className="ml-2 text-blue-500 cursor-pointer text-3xl hover:text-blue-700"
//           onClick={() => setIsDiagnosisEditable(true)}
//         />
//       </div>
//       <div className="border-2 border-slate-500 ml-28 mr-28 mt-2 p-2">
//         {isDiagnosisEditable ? (
//           <>
//             <textarea
//               value={diagnosis}
//               onChange={(e) => setDiagnosis(e.target.value)}
//               className="w-full h-32"
//             />
//             <FaSave
//               className="ml-2 text-green-500 cursor-pointer text-2xl hover:text-green-700"
//               onClick={handleSaveDiagnosis}
//             />
//           </>
//         ) : (
//           diagnosis
//         )}
//       </div>
//     </div>
//   );
// };

// export default Details;
import React, { useEffect, useState } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa'; // Added FaSave for save button
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { axiosInstance } from '../../lib/axios';

const Details = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [condition, setCondition] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [isConditionEditable, setIsConditionEditable] = useState(false); // State for condition editing
  const [isDiagnosisEditable, setIsDiagnosisEditable] = useState(false); // State for diagnosis editing
  const { doctorId } = useAuthContext();
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:5000/patient/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setCondition(response.data.illness);
        setDiagnosis(response.data.diagnosis);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchPatient();
  }, [id]);

  // Handle condition save
  const handleSaveCondition = async () => {
    try {
      const response = await axiosInstance.put(`http://localhost:5000/patient/editPatient/${id}`, {
        illness: condition,
      });
      console.log("Updated condition:", response.data);
      setIsConditionEditable(false); // Disable editing after save
    } catch (error) {
      console.error("Error updating condition:", error);
    }
  };

  // Handle diagnosis save
  const handleSaveDiagnosis = async () => {
    try {
      const response = await axiosInstance.put(`http://localhost:5000/patient/editPatient/${id}`, {
        diagnosis: diagnosis,
      });
      console.log("Updated diagnosis:", response.data);
      setIsDiagnosisEditable(false); // Disable editing after save
    } catch (error) {
      console.error("Error updating diagnosis:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg my-10 min-h-screen">
      {/* Patient Header */}
      <div className="mb-8 text-center">
        <h1 className="font-extrabold text-4xl text-blue-700">{name}</h1>
        <h2 className="text-xl font-semibold text-gray-600 mt-2">{email}</h2>
      </div>

      {/* Condition Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl text-gray-700">Condition:</h2>
          <FaEdit
            className="text-blue-500 cursor-pointer text-3xl hover:text-blue-700"
            onClick={() => setIsConditionEditable(true)}
          />
        </div>
        <div className="mt-2 border-2 border-gray-300 rounded-lg p-4">
          {isConditionEditable ? (
            <div className="flex items-center">
              <textarea
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full h-32 p-2 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSave
                className="ml-2 text-green-500 cursor-pointer text-2xl hover:text-green-700"
                onClick={handleSaveCondition}
              />
            </div>
          ) : (
            <p className="text-lg text-gray-600">{condition || 'No condition provided'}</p>
          )}
        </div>
      </div>

      {/* Diagnosis Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl text-gray-700">Diagnosis:</h2>
          <FaEdit
            className="text-blue-500 cursor-pointer text-3xl hover:text-blue-700"
            onClick={() => setIsDiagnosisEditable(true)}
          />
        </div>
        <div className="mt-2 border-2 border-gray-300 rounded-lg p-4">
          {isDiagnosisEditable ? (
            <div className="flex items-center">
              <textarea
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="w-full h-32 p-2 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSave
                className="ml-2 text-green-500 cursor-pointer text-2xl hover:text-green-700"
                onClick={handleSaveDiagnosis}
              />
            </div>
          ) : (
            <p className="text-lg text-gray-600">{diagnosis || 'No diagnosis provided'}</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-10">
        <div className="text-center">
          <p className="text-sm">&copy; 2024 5 Kilo Clinic. All Rights Reserved.</p>
          <p className="text-sm mt-2">Designed with ❤️ by Your Team.</p>
        </div>
      </footer>
    </div>
  );
};

export default Details;
