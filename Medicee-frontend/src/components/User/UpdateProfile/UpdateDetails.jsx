import React from "react";
import "./UpdateDetails.css";
import swal from "sweetalert";
import { useFormik } from "formik";
import image from "./Image/myp.png";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import YupPassword from "yup-password";
import "yup-phone";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { contextAPi } from "../../../App";
YupPassword(yup);

const UpdateDetails = () => {
  const { state, dispatch } = useContext(contextAPi);
  const History = useNavigate();
  const [UserUpdate, setUserUpdate] = useState(null);

  //  page load call callUpdatePage
  useEffect(() => {
    fetch("/user/update_details", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((responce) => {
        dispatch({ type: "user", payload: "user" });
        callUpdatePage(responce);
      })
      .catch((err) => {
        console.log(err);
        History("/login_user");
      });
  }, []);

  var userdetails;

  const callUpdatePage = (data) => {
    console.log(data);
    userdetails = {
      name: data.name,
      email: data.email,
      phone: data.phone,
    };
    setUserUpdate(userdetails);
  };

  const initialValues = {
    name: "",
    email: "",
    phone: "",
  };

  const validate = yup.object({
    name: yup.string().min(2).required(),
    phone: yup.string().phone().required(),
  });

  const users = useFormik({
    initialValues: UserUpdate === null ? initialValues : UserUpdate,
    validationSchema: validate,
    onSubmit: async (values) => {
      const { name, email, phone } = values;
      const res = await fetch("/user/update_details", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });
      const data = await res.json();

      if (res.status === 421 || !data) {
        swal("Error", "All field are required", "warning");
      } else {
        console.log("Data Updated Successfully");
        swal("Updated", "User Updated Successfully!", "success").then(() => {
          History("/user/add_appointment");
        });
      }
    },
    enableReinitialize: true,
  });

  return (
    <div>
      <div className="profile-1">
        <div className="profile-2">
          <div className="profile-4">
            <Link to="/user/home" className="profile-5">
              Home
            </Link>{" "}
            / Profile
          </div>
          <div className="profile-3">Profile</div>
        </div>
      </div>
      <div className="container registration-page">
        <div className="signup">
          <div className="container mt-5">
            <div className="update-content">
              <div className="signup-form">
                <h2 className="form-title mb-4 margin-top">Profile</h2>
                <form
                  className="register-form"
                  id="register-form"
                  onSubmit={users.handleSubmit}
                >
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
                      value={users.values.name}
                      onChange={users.handleChange}
                    />
                    {users.touched.name && users.errors.name && (
                      <p className="error-part">{users.errors.name}</p>
                    )}
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
                      value={users.values.email}
                      readOnly
                    />
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
                      value={users.values.phone}
                      onChange={users.handleChange}
                    />
                    {users.touched.phone && users.errors.phone && (
                      <p className="error-part">{users.errors.phone}</p>
                    )}
                  </div>

                  {/*submit button */}

                  <div className="form-group form-button">
                    <input
                      type="submit"
                      name="signup"
                      id="signup"
                      className="form-submit"
                      value="Update Details"
                    />
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

export default UpdateDetails;
