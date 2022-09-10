import React from "react";
import "./UpdateDetails.css";
import swal from "sweetalert";
import image from "./image/im.png";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import YupPassword from "yup-password";
import "yup-phone";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { contextAPi } from "../../../App";
import { Link } from "react-router-dom";
// import {useHistory} from "react-router-dom";
YupPassword(yup);

const UpdateDetails = () => {
  const History = useNavigate();
  const [hospital, sethospital] = useState(null);
  const { state, dispatch } = useContext(contextAPi);

  //  page load call callUpdatePage
  useEffect(() => {
    // < ------------------ added for authentication ---------------->

    axios
      .get("/hospital/logged")
      .then((res) => {
        dispatch({ type: "hospital", payload: "hospital" });
      })
      .catch((err) => {
        History("/login_hospital");
      });
    // <---------------------------------------------------------------->

    fetch("/hospital/update_details", {
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
        callUpdatePage(responce);
      })
      .catch((err) => {
        History("/login_hospital");
      });
  }, []);

  var hospitaldetails;

  const callUpdatePage = (data) => {
    hospitaldetails = {
      hospital_name: data.hospital_name,
      email: data.email,
      license_number: data.license_number,
      phone: data.phone,
      state: data.state,
      city: data.city,
      area: data.area,
      address: data.address,
      state_ranking: data.state_ranking,
      city_ranking: data.city_ranking,
    };
    sethospital(hospitaldetails);
  };

  const initialValues = {
    hospital_name: "",
    email: "",
    license_number: "",
    phone: "",
    state: "",
    city: "",
    area: "",
    address: "",
    state_ranking: "",
    city_ranking: "",
  };

  const validate = yup.object({
    hospital_name: yup.string().min(2).required(),
    license_number: yup.string().required(),
    phone: yup.string().phone().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    area: yup.string().required(),
    state_ranking: yup.number().required(),
    city_ranking: yup.number().required(),
    address: yup.string().required(),
  });

  const users = useFormik({
    initialValues: hospital === null ? initialValues : hospital,
    validationSchema: validate,
    onSubmit: async (values) => {
      //  wirte code here
      console.log(values);
      const {
        hospital_name,
        license_number,
        email,
        phone,
        state,
        city,
        area,
        address,
        state_ranking,
        city_ranking,
      } = values;
      const res = await fetch("/hospital/update_details", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hospital_name,
          license_number,
          email,
          phone,
          state,
          city,
          area,
          address,
          state_ranking,
          city_ranking,
        }),
      });
      const data = await res.json();

      if (res.status === 421 || !data) {
        swal("Error", "All field are required", "warning");
      } else {
        console.log("Data Updated Successfully");
        swal("Updated", "Hospital Updated Successfully!", "success").then(
          () => {
            History("/hospital/add_treatment");
          }
        );
      }
    },
    enableReinitialize: true,
  });

  return (
    <div>
      <div className="profile-1">
        <div className="profile-2">
          <div className="profile-4">
            <Link to="/hospital/home" className="profile-5">
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
                <h2 className="form-title mb-4 margin-top">Hospital Details</h2>
                <form
                  className="register-form"
                  id="register-form"
                  onSubmit={users.handleSubmit}
                >
                  {/* hospital name */}
                  <div className="form-group mb-2">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-hospital material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="hospital_name"
                      autoComplete="off"
                      placeholder="Enter Name"
                      className="roshan"
                      value={users.values.hospital_name}
                      onChange={users.handleChange}
                    />
                    {users.touched.hospital_name &&
                      users.errors.hospital_name && (
                        <p className="error-part">
                          {users.errors.hospital_name}
                        </p>
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
                      placeholder="Hospital Email"
                      className="roshan"
                      value={users.values.email}
                      readOnly
                    />
                  </div>

                  {/* license */}
                  <div className="form-group mb-2">
                    <label htmlFor="phone">
                      <i className="zmdi zmdi-local-hospital material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="license_number"
                      autoComplete="off"
                      placeholder="Hospital License Number"
                      className="roshan"
                      value={users.values.license_number}
                      onChange={users.handleChange}
                    />
                    {users.touched.license_number &&
                      users.errors.license_number && (
                        <p className="error-part">
                          {users.errors.license_number}
                        </p>
                      )}
                  </div>

                  {/* state */}
                  <div className="form-group mb-2">
                    <label htmlFor="email">
                      <i className="zmdi zmdi-map material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="state"
                      autoComplete="off"
                      placeholder="Enter State"
                      className="roshan"
                      value={users.values.state}
                      onChange={users.handleChange}
                    />
                    {users.touched.state && users.errors.state && (
                      <p className="error-part">{users.errors.state}</p>
                    )}
                  </div>

                  {/* city */}

                  <div className="form-group mb-2">
                    <label htmlFor="email">
                      <i className="zmdi zmdi-map material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="city"
                      autoComplete="off"
                      placeholder="Enter City"
                      className="roshan"
                      value={users.values.city}
                      onChange={users.handleChange}
                    />
                    {users.touched.city && users.errors.city && (
                      <p className="error-part">{users.errors.city}</p>
                    )}
                  </div>

                  {/* area */}

                  <div className="form-group mb-2">
                    <label htmlFor="email">
                      <i className="zmdi zmdi-map material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="area"
                      autoComplete="off"
                      placeholder="Enter Area"
                      className="roshan"
                      value={users.values.area}
                      onChange={users.handleChange}
                    />
                    {users.touched.area && users.errors.area && (
                      <p className="error-part">{users.errors.area}</p>
                    )}
                  </div>

                  {/* address */}

                  <div className="form-group mb-2">
                    <label htmlFor="email">
                      <i className="zmdi zmdi-map material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="address"
                      autoComplete="off"
                      placeholder="Enter Address"
                      className="roshan"
                      value={users.values.address}
                      onChange={users.handleChange}
                    />
                    {users.touched.address && users.errors.address && (
                      <p className="error-part">{users.errors.address}</p>
                    )}
                  </div>

                  {/* state Ranking */}

                  <div className="form-group mb-2">
                    <label htmlFor="phone">
                      <i className="zmdi zmdi-star material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="state_ranking"
                      autoComplete="off"
                      placeholder="State Ranking"
                      className="roshan"
                      value={users.values.state_ranking}
                      onChange={users.handleChange}
                    />
                    {users.touched.state_ranking &&
                      users.errors.state_ranking && (
                        <p className="error-part">
                          {users.errors.state_ranking}
                        </p>
                      )}
                  </div>

                  {/* City Ranking */}
                  <div className="form-group mb-2">
                    <label htmlFor="phone">
                      <i className="zmdi zmdi-star material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="city_ranking"
                      autoComplete="off"
                      placeholder="City Ranking"
                      className="roshan"
                      value={users.values.city_ranking}
                      onChange={users.handleChange}
                    />
                    {users.touched.city_ranking &&
                      users.errors.city_ranking && (
                        <p className="error-part">
                          {users.errors.city_ranking}
                        </p>
                      )}
                  </div>

                  {/* Phone */}

                  <div className="form-group mb-2">
                    <label htmlFor="phone">
                      <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      autoComplete="off"
                      placeholder="Hospital Phone Number"
                      className="roshan"
                      value={users.values.phone}
                      onChange={users.handleChange}
                    />
                    {users.touched.phone && users.errors.phone && (
                      <p className="error-part">{users.errors.phone}</p>
                    )}
                  </div>

                  {/* submit button */}

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
