// import React, { useEffect, useState } from 'react';
// import { useAuthContext } from '../context/AuthContext';
// import { axiosInstance } from '../lib/axios';
// import { Link } from 'react-router-dom';

// const Patient = () => {
//   const { currentUserName } = useAuthContext();
//   const [array, setArray] = useState<any>([]); 

//   useEffect(() => {
//     const getDoctor = async () => {
//       try {
//         const response = await axiosInstance.get('http://localhost:5000/doctor');
//         setArray(response.data); 
//       } catch (error) {
//         console.error("Error fetching doctors:", error); 
//       }
//     };

//     getDoctor(); 
//   }, []);

//   return (
//     <div className="flex flex-col min-h-screen">
//       <div className="flex-grow">
//         <h1 className="font-extrabold text-5xl text-custom-unknown">My Profile</h1>
//         <h2 className="font-bold pt-7">Username: {currentUserName}</h2>

//         <div className="pt-12">
//           <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
//             <thead>
//               <tr className="bg-gray-200 text-gray-700">
//                 <th className="py-3 px-4 text-left">ID</th>
//                 <th className="py-3 px-4 text-left">Description</th>
//                 <th className="py-3 px-4 text-left">Doctor</th>
//                 <th className="py-3 px-4 text-left">Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               {array.map((item: any, index: number) => (
//                 <tr key={item._id} className="hover:bg-gray-50">
                 
//                   <td className="py-3 px-4">{index + 1}</td>
//                   <td className="py-3 px-4">{item.specialization}</td>
//                   <td className="py-3 px-4">{item.name}</td>
//                   <td className="py-3 px-4">
//                     <Link to={`/doctor-details/${item._id}`} className="text-blue-500 hover:text-blue-700">
//                       View Details
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <footer className="bg-gray-800 text-white py-6 mt-auto">
//         <div className="max-w-7xl mx-auto text-center">
//           <p className="text-sm">&copy; 2024 5 Kilo Clinic. All Rights Reserved.</p>
//           <p className="text-sm mt-2">Designed with ❤️ by Your Team.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Patient;
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { axiosInstance } from '../lib/axios';
import { Link } from 'react-router-dom';

/*************  ✨ Codeium Command ⭐  *************/
/**
 * The Patient component renders the profile page for a logged-in user.
 *
 * The page displays the user's username, and a table of doctors with their
 * specializations and names. Each doctor's row has a "Details" link that
 * navigates to the doctor's details page.
 *
 * The page also includes a footer with copyright information and a message
 * indicating who designed the page.
 */
/******  74dfaf8d-2742-4eb7-8e1f-74a72a351a50  *******/
const Patient = () => {
  const { currentUserName } = useAuthContext();
  const [array, setArray] = useState<any>([]);

  useEffect(() => {
    const getDoctor = async () => {
      try {
        const response = await axiosInstance.get('/doctor');
        setArray(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    getDoctor();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main content area */}
      <div className="flex-grow p-6">
        <h1 className="text-5xl font-extrabold text-blue-700">My Profile</h1>
        <h2 className="text-xl font-semibold text-gray-700 mt-4">Username: {currentUserName}</h2>

        {/* Doctors Table */}
        <div className="pt-8">
          <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-100 text-blue-700">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Doctor</th>
                <th className="py-3 px-4 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              {array.map((item: any, index: number) => (
                <tr key={item._id} className="hover:bg-blue-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 text-gray-700">{item.specialization}</td>
                  <td className="py-3 px-4 text-gray-700">{item.name}</td>
                  <td className="py-3 px-4">
                    <Link to={`/doctor-details/${item._id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">&copy; 2024 5 Kilo Clinic. All Rights Reserved.</p>
          <p className="text-sm mt-2">Designed with ❤️ by Your Team.</p>
        </div>
      </footer>
    </div>
  );
};

export default Patient;
