import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Admin from './Admin/Admin'
import Doctor from './Doctor/Doctor'
import Patient from './Patient/Patient'
import AddPatient from './Doctor/AddPatient'
import AddDoctor from './pages/AddDoctor/AddDoctor'
import EditDoctor from './Admin/EditDoctor'
import EditPatient from './Admin/EditPatient'
import Details from './pages/Details/Details'
import DoctorDetails from './pages/DoctorDetails/DoctorDetails'
import Appointment from './pages/Appointment/Appointment'
import { Loading } from './pages/Loading/Loading'
export default function App() {
  return (
  
    
    <Routes>
       <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Signup/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/doctor" element={<Doctor />}/>
        <Route path="addpatient" element={<AddPatient />} /> {/* Nested route */}
      
      <Route path="/patient" element={<Patient/>}/>
      <Route path="add-doctor" element={<AddDoctor/>}/>
      <Route path="editDoctor/:id" element={<EditDoctor/>}/>
      <Route path="editPatient/:id" element={<EditPatient/>}/>
      <Route path="details/:id" element={<Details/>}/>
      <Route path="/doctor-details/:id" element={<DoctorDetails/>}/>
      <Route path="/appointment/:id" element={<Appointment/>}/>
      <Route path="/load" element={<Loading/>}/>



    </Routes>
    
      
     
      
      
      
     
   

  
   
   
  )
}