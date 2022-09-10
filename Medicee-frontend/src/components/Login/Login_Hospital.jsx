import React, { useState } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import swal from "sweetalert";
import { useContext } from "react";
import { contextAPi } from "../../App";
import YupPassword from "yup-password";
YupPassword(yup);

const Login = () => {
  const { state, dispatch } = useContext(contextAPi);

  const History = useNavigate();

  const validate = yup.object({
    email: yup.string().email().required(),
    password: yup.string().password().required(),
  });

  const user = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      const { email, password } = values;

      const res = await fetch("/login_hospital", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      if (!data || res.status === 400) {
        swal("Error", "Invalid Login", "warning");
      } else if (res.status === 404) {
        swal("Error", "Invalid Credential", "warning");
      } else if (res.status === 402) {
        swal("Pending Status", "Pending For Approval!", "warning");
      } else if (res.status === 403) {
        swal("Rejected", "Hospital Rejected!", "warning");
      } else {
        swal("Good job!", "Login Successfully!", "success").then((value) => {
          dispatch({ type: "hospital", payload: "hospital" });
          History("/hospital/add_treatment");
        });
      }
    },
  });

  return (
    <div className="container registration-page">
      <div className="login">
        <div className="container mt-5">
          <div className="login-content">
            <div className="login-image">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/nurses-discuss-with-a-doctor-5226208-4360156.png"
                alt=""
              />
            </div>
            <div className="login-form">
              <h2 className="form-title mb-4 margin-top">Login</h2>
              <form
                className="register-form"
                id="register-form"
                onSubmit={user.handleSubmit}
              >
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
                  {user.touched.email && user.errors.email && (
                    <p className="error-part">{user.errors.email}</p>
                  )}
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
                  {user.touched.password && user.errors.password && (
                    <p className="error-part">{user.errors.password}</p>
                  )}
                </div>

                {/*submit button */}

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="login"
                    id="login"
                    className="form-submit"
                    value="Login"
                  />
                </div>
                Don't have an account?{" "}
                  <a href="/registration_hospital">Register</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
