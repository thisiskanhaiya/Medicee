import React from "react";
import "./AddHospital.css";
import swal from "sweetalert";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import YupPassword from "yup-password";
import { useContext } from "react";
import { contextAPi } from "../../../../App";
import { Link } from "react-router-dom";
import "yup-phone";
import { useState } from 'react'
YupPassword(yup);

const AddHospital = () => {
  const History = useNavigate();
  const { state, dispatch } = useContext(contextAPi);
  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);
  const [area, setArea] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      const stateResponse = await axios.get("/suggestion/states");
      console.log(stateResponse.data);
      setStates(stateResponse.data);
    };

    const getCity = async () => {
      const cityResponse = await axios.get("/suggestion/city");
      console.log(cityResponse.data);
      setCity(cityResponse.data);
    };

    const getArea = async () => {
      const areaResponse = await axios.get("/suggestion/areas");
      console.log(areaResponse.data);
      setArea(areaResponse.data);
    };

    getStates();
    getCity();
    getArea();
  }, []);

  const [stateSuggestion, setStateSuggestoion] = useState([]);
  const [citySuggestion, setCitySuggestoion] = useState([]);
  const [areaSuggestion, setAreaSuggestoion] = useState([]);

  
  const handleStateSugestion = (event) => {
    let text = event.target.value;
    let matches = [];
    if (text.length > 0) {
      matches = states.filter((state) => {
        const regex = new RegExp(`${text}`, "gi");
        return state.match(regex);
      });
    }
    console.log(matches);
    setStateSuggestoion(matches);
  };

  const handleCitySugestion = (event) => {
    let text = event.target.value;
    let matches = [];
    if (text.length > 0) {
      matches = city.filter((city) => {
        const regex = new RegExp(`${text}`, "gi");
        return city.match(regex);
      });
    }
    console.log(matches);
    setCitySuggestoion(matches);
  };

  const handleAreaSugestion = (event) => {
    let text = event.target.value;
    let matches = [];
    if (text.length > 0) {
      matches = area.filter((area) => {
        const regex = new RegExp(`${text}`, "gi");
        return area.match(regex);
      });
    }
    console.log(matches);
    setAreaSuggestoion(matches);
  };

  const setStateOption = (event) => {
    let val = event.target.textContent;
    user.values.state = val;
    setStateSuggestoion([]);
  };

  const setCityOption = (event) => {
    let val = event.target.textContent;
    user.values.city = val;
    setCitySuggestoion([]);
  };

  const setAreaOption = (event) => {
    let val = event.target.textContent;
    user.values.area = val;
    setAreaSuggestoion([]);
  };

  useEffect(() => {
    axios
      .get("/checkuserlogin")
      .then((res) => {
        dispatch({ type: "admin", payload: "admin" });
      })
      .catch((err) => {
        History('/login_user');
      });
  },[]);

  const validate = yup.object({
    hospital_name: yup.string().min(2).required(),
    email: yup.string().email().required(),
    license_number: yup.string().required(),
    phone: yup.string().phone().required(),
    password: yup.string().password().required(),
    confirm_password: yup.string().password().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    area: yup.string().required(),
    state_ranking: yup.number().required(),
    city_ranking: yup.number().required(),
    address: yup.string().required(),
  });

  const user = useFormik({
    initialValues: {
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
      password: "",
      confirm_password: "",
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      const {
        hospital_name,
        email,
        license_number,
        state,
        city,
        area,
        state_ranking,
        city_ranking,
        address,
        phone,
        password,
        confirm_password,
      } = values;
      const res = await fetch("/registration_hospital", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hospital_name,
          email,
          license_number,
          phone,
          password,
          confirm_password,
          state,
          city,
          area,
          state_ranking,
          city_ranking,
          address,
        }),
      });
      const data = await res.json();
      console.log(data);

      if (res.status === 421 || !data) {
        swal("Error", "All field are required", "warning");
      } else if (res.status === 422) {
        swal("Error", "Hospital already exist", "warning");
      } else if (res.status === 423) {
        swal("Error", "Passwords doesnot match correctly", "warning");
      } else {
        swal("Added", "Hospital Registerd Successfully!", "success").then(
          (value) => {
            History("/login_hospital");
          }
        );
      }
    },
  });

  return (
    <div>
      <div className="profile-1">
        <div className="profile-2">
          <div className="profile-4">
            <Link to="/admin/home" className="profile-5">
              Home
            </Link>{" "}
            / Add Hospital
          </div>
          <div className="profile-3">Add Hospital</div>
        </div>
      </div>
    <div className="container registration-page">
      <div className="signup">
        <div className="container mt-5">
          <div className="update-content">
            <div className="signup-form">
              <h2 className="form-title mb-4 margin-top">
                Registration Hospital
              </h2>
              <form
                className="register-form"
                id="register-form"
                onSubmit={user.handleSubmit}
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
                    placeholder="Hospital Name"
                    className="roshan"
                    value={user.values.hospital_name}
                    onChange={user.handleChange}
                  />
                  {user.touched.hospital_name && user.errors.hospital_name && (
                    <p className="error-part">{user.errors.hospital_name}</p>
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
                    value={user.values.email}
                    onChange={user.handleChange}
                  />
                  {user.touched.email && user.errors.email && (
                    <p className="error-part">{user.errors.email}</p>
                  )}
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
                    value={user.values.license_number}
                    onChange={user.handleChange}
                  />
                  {user.touched.license_number &&
                    user.errors.license_number && (
                      <p className="error-part">{user.errors.license_number}</p>
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
                    value={user.values.state}
                    onChange={user.handleChange}
                    onInput={handleStateSugestion}
                  />
                  {user.touched.state && user.errors.state && (
                    <p className="error-part">{user.errors.state}</p>
                  )}
                  <div className="options-container">
                  {stateSuggestion.map((state) => {
                    return (
                      <div className="options giveborder" onClick={setStateOption}>
                        {state}
                      </div>
                    );
                  })}
                  </div>
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
                    value={user.values.city}
                    onChange={user.handleChange}
                    onInput={handleCitySugestion}
                  />
                  {user.touched.city && user.errors.city && (
                    <p className="error-part">{user.errors.city}</p>
                  )}
                  <div className="options-container">
                  {citySuggestion.map((city) => {
                    return (
                      <div className="options giveborder" onClick={setCityOption}>
                        {city}
                      </div>
                    );
                  })}
                  </div>
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
                    value={user.values.area}
                    onChange={user.handleChange}
                    onInput={handleAreaSugestion}
                  />
                  {user.touched.area && user.errors.area && (
                    <p className="error-part">{user.errors.area}</p>
                  )}
                  <div className="options-container">
                  {areaSuggestion.map((area) => {
                    return (
                      <div className="options giveborder" onClick={setAreaOption}>
                        {area}
                      </div>
                    );
                  })}
                  </div>
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
                    value={user.values.address}
                    onChange={user.handleChange}
                  />
                  {user.touched.address && user.errors.address && (
                    <p className="error-part">{user.errors.address}</p>
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
                    value={user.values.state_ranking}
                    onChange={user.handleChange}
                  />
                  {user.touched.state_ranking && user.errors.state_ranking && (
                    <p className="error-part">{user.errors.state_ranking}</p>
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
                    value={user.values.city_ranking}
                    onChange={user.handleChange}
                  />
                  {user.touched.city_ranking && user.errors.city_ranking && (
                    <p className="error-part">{user.errors.city_ranking}</p>
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
                    value={user.values.phone}
                    onChange={user.handleChange}
                  />
                  {user.touched.phone && user.errors.phone && (
                    <p className="error-part">{user.errors.phone}</p>
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
                  {user.touched.confirm_password &&
                    user.errors.confirm_password && (
                      <p className="error-part">
                        {user.errors.confirm_password}
                      </p>
                    )}
                </div>

                {/*submit button */}

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value="Register"
                  />
                </div>
              </form>
            </div>
            <div className="signup-image">
              <img
                src="https://media.istockphoto.com/vectors/young-woman-receptionist-in-medical-mask-vector-id1269165277?k=20&m=1269165277&s=612x612&w=0&h=U46OsZauElcQ8kPhLIbxtr2InY4_GhpPfEyHaj0s-bs="
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddHospital;
