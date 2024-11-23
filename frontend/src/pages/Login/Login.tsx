import React, { useState } from 'react';
import { axiosInstance } from '../../lib/axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { Loading } from '../Loading/Loading';
const Login = () => {
  const { setCurrentUserName , setDoctor, setDoctorId} = useAuthContext();
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to check if the user is an admin
  const checkAdmin = async () => {
    try {
      const res = await axiosInstance.post('/auth/check', { username });
      if (res.data && res.data.admin) {
        console.log('Redirecting to Admin Page...');
        navigate('/admin');
        return true; // Successfully found admin
      }
      return false; // Not an admin
    } catch (error) {
      console.log('Error checking admin:', error);
      return false; // Error or not an admin
    }
  };

  // Function to check if the user is a doctor
  const checkDoctor = async () => {
    try {
      const res = await axiosInstance.post('/auth/isdoctor', { username, password});
      if (res.data && res.data.doctor) {
        console.log('Redirecting to Doctor Page...');
        setDoctor(username);
        setDoctorId(res.data.user);
        navigate('/doctor');
        return true; // Successfully found doctor
      }
      return false; // Not a doctor
    } catch (error) {
      console.log('Error checking doctor:', error);
      return false; // Error or not a doctor
    }
  };

  // Function for normal login (patient)
  const normalLogin = async () => {
    try {
      const response = await axiosInstance.post('/auth/login', { username, password });
      if (response.data) {
        setCurrentUserName(username);
        navigate('/patient');  // Redirect to patient dashboard
      } else {
        console.log('Invalid credentials');
      }
    } catch (error) {
      console.log('Error during login:', error);
    }
  };

  // Main login handler
  const login = async () => {
    try{
      setIsLoading(true);
      const isAdmin = await checkAdmin();
      if (isAdmin) return; // If user is an admin, stop further checks
  
      const isDoctor = await checkDoctor();
      if (isDoctor) return; // If user is a doctor, stop further checks
  
      // If not admin or doctor, proceed with normal login
      normalLogin();

    }catch(error){ 
      console.log(error);
    }
    finally{
      setIsLoading(false);
    }
  
  };

  return (
    <>
    {isLoading && <Loading />}
    <div className="flex flex-col bg-custom-blue text-white min-h-screen">
      <h1 className="font-extrabold flex justify-center text-4xl sm:text-7xl mt-7">
        Welcome to <span className="text-custom-gray">5 Kilo Clinic</span>
      </h1>
      <h2 className="text-white text-lg font-bold flex justify-center pt-11 sm:text-xl">
        Your Health, Our Priority. Trusted Care, Trusted Doctors
      </h2>

      <div className="flex justify-center items-center flex-grow">
        <div className="bg-white rounded-md flex flex-col w-[572px] h-[471px] p-6">
          <h1 className="text-custom-blue text-2xl font-bold mb-4">Login</h1>
          <h3 className="mb-2 text-custom-blue font-bold">Username</h3>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded mb-4 text-black"
            onChange={(e) => setUserName(e.target.value)}
            value={username}
          />
          <h3 className="mb-2 text-custom-blue font-bold">Password</h3>
          <input
            type="password"
            className="border border-gray-300 p-2 rounded mb-4 text-black"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button className="bg-custom-blue text-white font-bold rounded p-2 mt-2" onClick={login}>
            Login
          </button>
          <h3 className="text-custom-blue">
            Don't have an account <a href="/">Signup</a>
          </h3>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
