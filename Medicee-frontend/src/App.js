import React, { createContext, useReducer } from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import Services from './components/Services/Services';
import ContactUs from './components/Contact Us/ContactUs';
import Registration from './components/Registration/Registration';
import RegistrationHospital from './components/Registration/Registration_Hospital';
import Login from './components/Login/Login';
import LoginHospital from './components/Login/Login_Hospital';
import NoPage from './components/404/NoPage';
import { initialState, reducer } from './Reducer/userReducer';
import UpdateDetails from './components/Hospital/UpdateDetails/UpdateDetails';
import AddTreatment from './components/Hospital/AddTreatment/AddTreatment';
import ShowTreatment from './components/Hospital/ShowTreatment/ShowTreatment';
import Logout from './components/Hospital/Logout/Logout';
import UpdateUserDetails from './components/User/UpdateProfile/UpdateDetails';
import AddAppointment from './components/User/AddAppoinment/AddAppointment';
import ShowAppointment from './components/User/ShowAppoinment/ShowAppointment';
import LogoutUser from './components/User/Logout/Logout'
import LogoutAdmin from './components/Admin/Logout/Logout'
import AdminAddUser from './components/Admin/User/AddUser'
import AdminShowUser from './components/Admin/User/ShowUser'
import AddHospital from './components/Admin/Hospital/AddHospital/AddHospital';
import ShowHospital from './components/Admin/Hospital/ShowHospital/ShowHospital';
import PendingHospital from './components/Admin/Hospital/PendingHospital/PendingHospital';
import ShowAppointmentAdmin from './components/Admin/Appointment/ShowAppointment/ShowAppointment';
import FAQ from './components/Admin/FAQ/FAQ'
import FAQS from './components/FAQ/FAQ';
import Footer from './components/Footer/footer';
import UserHome from './components/User/Home/Home';
import UserServices from './components/User/Services/Services';
import UserFAQ from './components/User/FAQ/FAQ';
import UserContactUs from './components/User/Contact Us/ContactUs';
import HospitalHome from './components/Hospital/Home/Home';
import HospitalServices from './components/Hospital/Services/Services';
import HospitalFAQ from './components/Hospital/FAQ/FAQ';
import HospitalContactUs from './components/Hospital/Contact Us/ContactUs';
import AdminHome from './components/Admin/Home/Home';
import AdminServices from './components/Admin/Services/Services';
import AdminFAQ from './components/Admin/FAQMain/FAQ';

// craete context API
export const contextAPi = createContext();
const Routing = () => {

  return (
    <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="services" element={<Services></Services>} />
        <Route path="contactus" element={<ContactUs></ContactUs>} />
        <Route path="registration_user" element={<Registration></Registration>}/>
        <Route path="registration_hospital" element={<RegistrationHospital></RegistrationHospital>}/>
        <Route path="login_user" element={<Login></Login>}/>
        <Route path="login_hospital" element={<LoginHospital></LoginHospital>}/>
        <Route path="faq" element={<FAQS></FAQS>}/>
        


        <Route path="*" element={<NoPage></NoPage>} />

        <Route path="/hospital/home" element={<HospitalHome></HospitalHome>} />
        <Route path="/hospital/services" element={<HospitalServices></HospitalServices>} />
        <Route path="/hospital/faq" element={<HospitalFAQ></HospitalFAQ>} />
        <Route path="/hospital/contactus" element={<HospitalContactUs></HospitalContactUs>} />
        <Route path="/hospital/update_details" element={<UpdateDetails></UpdateDetails>} />
        <Route path="/hospital/add_treatment" element={<AddTreatment></AddTreatment>} />
        <Route path="/hospital/show_appointment" element={<ShowTreatment></ShowTreatment>}/>
        <Route path="/hospital/logout" element={<Logout></Logout>}/>
        
        <Route path="/user/home" element={<UserHome></UserHome>} />
        <Route path="/user/services" element={<UserServices></UserServices>} />
        <Route path="/user/faq" element={<UserFAQ></UserFAQ>} />
        <Route path="/user/contactus" element={<UserContactUs></UserContactUs>} />
        <Route path="/user/update_details" element={<UpdateUserDetails></UpdateUserDetails>} />
        <Route path="/user/add_appointment" element={<AddAppointment></AddAppointment>} />
        <Route path="/user/show_appointment" element={<ShowAppointment></ShowAppointment>}/>
        <Route path="/user/logout" element={<LogoutUser></LogoutUser>}/>

        <Route path="/admin/home" element={<AdminHome></AdminHome>} />
        <Route path="/admin/services" element={<AdminServices></AdminServices>} />
        <Route path="/admin/faq" element={<AdminFAQ></AdminFAQ>} />
        <Route path="/admin/user/add_user" element={<AdminAddUser></AdminAddUser>} />
        <Route path="/admin/user/show_user" element={<AdminShowUser></AdminShowUser>} />
        <Route path="/admin/hospital/add_hospital" element={<AddHospital></AddHospital>} />
        <Route path="/admin/hospital/show_hospital" element={<ShowHospital></ShowHospital>} />
        <Route path="/admin/hospital/pending_hosspital" element={<PendingHospital></PendingHospital>} />
        <Route path="/admin/hospital/show_appointment" element={<ShowAppointmentAdmin></ShowAppointmentAdmin>} />
        <Route path="/admin/asked_faq" element={<FAQ></FAQ>} />


        <Route path="/admin/logout" element={<LogoutAdmin></LogoutAdmin>}/>
    </Routes>

  )
}

function App() {
  
  const [ state, dispatch ] = useReducer(reducer, initialState);
  
  return (
    <div>
      <contextAPi.Provider value={{state,dispatch}}>
        <BrowserRouter>
            <Header />
            <Routing />
            <Footer />
        </BrowserRouter>
      </contextAPi.Provider>
      
      
    </div>
      
  );
}

export default App;
