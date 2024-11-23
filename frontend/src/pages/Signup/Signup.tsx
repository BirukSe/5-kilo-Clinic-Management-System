import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {axiosInstance} from '../../lib/axios.ts'
import { useAuthContext } from '../../context/AuthContext.tsx';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading/Loading.tsx';
const Signup = () => {
  const {setCurrentUserName} = useAuthContext();
  const navigate = useNavigate();
  const [name, setName]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [username, setUsername]=useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
 async function Signuper(){
  try{
    setIsLoading(true);
    const response=await axiosInstance.post('/auth/signup', {name,email,password,username});
    
    if(!response.data){
      console.log('Invalid credentials');
    }
    setCurrentUserName(username);
    navigate('/patient');

  }
  catch(error){
    console.log(error);
  }finally{
    setIsLoading(false);
  }

 }
  return (
    <>
    {isLoading && <Loading />}
    <div className="flex flex-col bg-custom-blue text-white min-h-screen">
        <h1 className="font-extrabold flex justify-center text-7xl mt-7">Welcome to <span className="text-custom-gray"> 5 Kilo Clinic</span></h1>
        <h2 className="text-white text-xl font-bold flex justify-center pt-11">Your Health, Our Priority. Trusted Care, Trusted Doctors</h2>
        
        
        <div className="flex justify-center items-center flex-grow ">
            <div className="bg-white rounded-md flex flex-col w-[572px] h-[520px] p-6">

                <h1 className="text-custom-blue text-2xl font-bold mb-4">Signup</h1>
                                
                <h3 className="mb-2 text-custom-blue font-bold">Name</h3>
                <input type="text" className=" text-black border border-gray-300 p-2 rounded mb-4 " onChange={(e) => setName(e.target.value)} value={name} />


                <h3 className="mb-2 text-custom-blue font-bold">Username</h3>
                <input type="text" className=" text-black border border-gray-300 p-2 rounded mb-4" onChange={(e) => setUsername(e.target.value)} value={username}/>
                                
                <h3 className="mb-2 text-custom-blue font-bold">email</h3>
                <input type="text" className=" text-black border border-gray-300 p-2 rounded mb-4" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <h3 className="mb-2 text-custom-blue font-bold">Password</h3>
                <input type="password" className=" text-black border border-gray-300 p-2 rounded mb-4" onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button className="bg-custom-blue text-white font-bold rounded p-2 mt-2" onClick={Signuper}>Signup</button>
                <h3 className="text-custom-blue">Already have an account? <Link to="/login">Login</Link></h3>
            </div>
        </div>
    </div>
    </>
  )
}

export default Signup;
