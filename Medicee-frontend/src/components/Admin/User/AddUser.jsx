import React from "react";
import "./AddUser.css"
import image from './image/useredit.png'
import swal from 'sweetalert';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate  } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import YupPassword from 'yup-password';
import { useContext } from "react";
import { contextAPi } from "../../../App";
import "yup-phone";
YupPassword(yup) 
const AddUser = () => {
  const { state, dispatch } = useContext(contextAPi);
  useEffect(() => {
    axios
      .get("/checkuserlogin")
      .then((res) => {
        dispatch({ type: "admin", payload: "admin" });
      })
      .catch((err) => {
        History('/login_user');
      });
  }, []);
  
  // write code for backend connect to frontend
  const History = useNavigate();

  const validate = yup.object({
    name: yup.string().min(2).required(),
    email: yup.string().email().required(),
    phone: yup.string().phone().required(),
    password: yup.string().password().required(),
    confirm_password: yup.string().password().required(),
  });

  const user = useFormik({
    initialValues: {
      name:"",
      email:"",
      phone:"",
      password:"",
      confirm_password:""
    },
    validationSchema: validate,
    onSubmit: async (values) => {

      const {name, email, phone, password, confirm_password} = values;
      const res = await fetch('/registration_user',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name, email, phone, password, confirm_password
        })
      })
      
      const data = await res.json();
      console.log(data);
    
      
      if(res.status === 421 || !data){
        swal("Error", "All field are required", "warning");
      }
      else if(res.status === 422 ) {
        swal("Error", "User already exist", "warning");
      }
      else if(res.status === 423){
        swal("Error","Passwords doesnot match correctly", "warning");
      }
      else{
        swal("Added", "User Added Successfully!", "success")
        .then((value) => {
          History("/")
        });
        
      }

    }
    
  });

  return (
    <div>
      <div className="profile-1">
        <div className="profile-2">
          <div className="profile-4">
            <Link to="/admin/home" className="profile-5">
              Home
            </Link>{" "}
            / Add User
          </div>
          <div className="profile-3">Add User</div>
        </div>
      </div>
    <div className="container registration-page">
      <div className="signup">
        <div className="container mt-5">
          <div className="update-content">
            <div className="signup-form">
              <h2 className="form-title mb-4 margin-top">Add User</h2>
              <form className="register-form" id="register-form" onSubmit={user.handleSubmit}>
                {/* name */}
                <div className="form-group mb-2">
                  <label htmlFor="name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="name"
                    autoComplete="off"
                    placeholder="Your Name"
                    className="roshan"
                    value={user.values.name}
                    onChange={user.handleChange}
                  />
                  {user.touched.name && user.errors.name && <p className="error-part">{user.errors.name}</p>}
                </div>
                {/* email */}
                <div className="form-group mb-2">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    placeholder="Your Email"
                    className="roshan"
                    value={user.values.email}
                    onChange={user.handleChange}
                  />
                  {user.touched.email && user.errors.email && <p className="error-part">{user.errors.email}</p>}
                </div>

                {/* phone */}
                <div className="form-group mb-2">
                  <label htmlFor="phone">
                    <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    autoComplete="off"
                    placeholder="Your Phone"
                    className="roshan"
                    value={user.values.phone}
                    onChange={user.handleChange}
                  />
                  {user.touched.phone && user.errors.phone && <p className="error-part">{user.errors.phone}</p>}
                </div>

                {/* password */}
                <div className="form-group mb-2">
                  <label htmlFor="password">
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    autoComplete="off"
                    placeholder="Your Password"
                    className="roshan"
                    value={user.values.password}
                    onChange={user.handleChange}
                  />
                  {user.touched.password && user.errors.password && <p className="error-part">{user.errors.password}</p>}
                </div>

                {/* confirm password */}
                <div className="form-group">
                  <label htmlFor="confirm_password">
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input
                    type="password"
                    name="confirm_password"
                    autoComplete="off"
                    placeholder="Your Password"
                    className="roshan"
                    value={user.values.confirm_password}
                    onChange={user.handleChange}
                  />
                  {user.touched.confirm_password && user.errors.confirm_password && <p className="error-part">{user.errors.confirm_password}</p>}
                </div>

                {/*submit button */}

                <div className="form-group form-button">
                  <input type="submit" name="signup" id="signup" className="form-submit" value="Add User"/>
                </div>



              </form>
              
            </div>
            <div className="signup-image">
                
                  <img src={image} alt="" />
                
              </div>
          </div>

        </div>
      </div>

    </div>
    </div>
    
  );
};

export default AddUser;
