import React, { useState } from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { Button } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

import Doctor from "./image/doctors.png";
import "./AddAppointment.css";
import swal from "sweetalert";
import axios from "axios";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { contextAPi } from "../../../App";

import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import YupPassword from "yup-password";
import "yup-phone";
YupPassword(yup);

const AddAppointment = () => {
  const { state, dispatch } = useContext(contextAPi);
  const History = useNavigate();
  const [states, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [area, setArea] = useState([]);
  const [treatmentdata, setTreatment] = useState([]);
  const [hospitalname, setname] = useState(null);
  const [hospitalemail, setemail] = useState(null);
  const [hospitalphone, setPhones] = useState(null);
  const [myemail, setMyemail] = useState(null);
  const [hospitaladdress, setAddress] = useState(null);
  const [treatmnetname, setTreatmnetname] = useState(null);
  const [data, setData] = useState({
    state: "",
    city: "",
    area: "",
    treatment: "",
  });

  // pop submit appoinment
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const handleClickOpen = (event) => {
    setname(event.target.name);
    setemail(event.target.id);
    setPhones(event.target.getAttribute("data-phone"));
    setAddress(event.target.getAttribute("data-address"));
    console.log(event.target.ids, event.target.address, event.target.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [tabledata, setTable] = useState([]);

  useEffect(() => {
    axios
      .get("/getstates")
      .then((res) => {
        setState(res.data["states"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/checkuserlogin")
      .then((res) => {
        setMyemail(res.data.email)
        dispatch({ type: "user", payload: "user" });
      })
      .catch((err) => {
        History("/login_user");
      });
  }, []);

  const changeSelectOptionHandler = (event) => {
    setData({ ...data, state: event.target.value });
    axios
      .post("/getcities", event.target.value)
      .then((res) => {
        setCity(res.data["cities"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeSelect = (event) => {
    setData({ ...data, city: event.target.value });
    axios
      .post("/getareas", event.target.value)
      .then((res) => {
        setArea(res.data["areas"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changevalue = (event) => {
    setData({ ...data, area: event.target.value });
    axios
      .post("/gettreatment", event.target.value)
      .then((res) => {
        setTreatment(res.data["treatmentDepartment"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changevaluetreatment = (events) => {
    setData({ ...data, treatment: events.target.value });
  };

  const handleClick = (event) => {
    setTreatmnetname(data.treatment);
    axios
      .post("/getdata", data)
      .then((res) => {
        if (res.status === 400) {
          swal("Error", "Data not found", "warning");
        } else {
          setTable(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  // const [ramsita, setRamsita]
  let table;

  if (tabledata) {
    table = tabledata.map((row, index) => {
      let roshan;
      let rock = row.treatmentDepartment;
      rock.map((val, index) => {
        if (val === treatmnetname) {
          roshan = row.doctor[index];
        }
      });

      return (
        <StyledTableRow key={row.hospital_name}>
          <StyledTableCell align="center">{row.hospital_name}</StyledTableCell>

          <StyledTableCell align="center">{roshan}</StyledTableCell>
          <StyledTableCell align="center">
            <Button
              id={row.email}
              name={row.hospital_name}
              data-phone={row.phone}
              data-address={row.address}
              onClick={handleClickOpen}
              variant="contained"
            >
              Book
            </Button>
          </StyledTableCell>
        </StyledTableRow>
      );
    });
  }
  // State: {row.state_ranking} City: {row.city_ranking}
  const validate = yup.object({
    name: yup.string().min(2).required(),
    phone: yup.string().phone().required(),
    date: yup.date().required(),
  });

  const user = useFormik({
    initialValues: {
      name: "",
      phone: "",
      date: "",
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      const { name, phone, date } = values;
      const email = myemail;
      const hospital_name = hospitalname;
      const hospital_email = hospitalemail;
      const hospital_phone = hospitalphone;
      const hospital_address = hospitaladdress;
      const treatment_name = treatmnetname;
      console.log(name, phone, date, myemail)
      const res = await fetch("/user/add_appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hospital_name,
          hospital_email,
          hospital_phone,
          hospital_address,
          treatment_name,
          name,
          email,
          phone,
          date,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 421 || !data) {
        swal("Error", "All field are required", "warning");
      } else if (res.status === 422) {
        swal("Error", "You already booked for same date", "warning");
      } else {
        swal("Booked", "Book Appointment Successfully!", "success").then(
          (value) => {
            History("/user/update_details");
          }
        );
      }
    },
  });

  return (
    <>
      <div>
        <div className="add-1">
          <div className="add-2">
            <div className="add-4">
              <Link to="/user/home" className="add-5">
                Home
              </Link>{" "}
              / Add Appointment
            </div>
            <div className="add-3">Add Appointment</div>
          </div>
        </div>
        <div className="container registration-page">
          <div className="signup">
            <div className="container mt-5">
              <div className="signup-contents">
                <div className="new-content">
                  <div className="signup-images">
                    <img src={Doctor} alt="" />
                  </div>
                  <div className="signup-form">
                    <h2 className="form-title mb-4 margin-top">
                      Add Appointment
                    </h2>
                    <form className="register-form" id="register-form">
                      {/* state */}
                      <div className="form-group mb-2">
                        <label htmlFor="name">
                          <i className="zmdi zmdi-map material-icons-name"></i>
                        </label>

                        <select
                          name="state"
                          className="dropdown"
                          onChange={changeSelectOptionHandler}
                        >
                          <option disabled hidden selected>
                            Select State
                          </option>
                          {states.map((state) => {
                            return <option value={state}>{state}</option>;
                          })}
                        </select>
                      </div>
                      {/* city */}
                      <div className="form-group mb-2">
                        <label htmlFor="email">
                          <i className="zmdi zmdi-city material-icons-name"></i>
                        </label>

                        <select
                          name="city"
                          className="dropdown"
                          onChange={changeSelect}
                        >
                          <option disabled hidden selected>
                            Select City
                          </option>

                          {city.map((datacity) => {
                            return <option value={datacity}>{datacity}</option>;
                          })}
                        </select>
                      </div>

                      {/* area */}
                      <div className="form-group mb-2">
                        <label htmlFor="phone">
                          <i className="zmdi zmdi-star material-icons-name"></i>
                        </label>

                        <select
                          name="area"
                          className="dropdown"
                          onChange={changevalue}
                        >
                          <option disabled hidden selected>
                            Select Area
                          </option>
                          {area.map((dataarea) => {
                            return <option value={dataarea}>{dataarea}</option>;
                          })}
                        </select>
                      </div>

                      {/* treatment */}
                      <div className="form-group mb-2">
                        <label htmlFor="treatment">
                          <i className="zmdi zmdi-local-hospital material-icons-name"></i>
                        </label>

                        <select
                          name="treatment"
                          className="dropdown"
                          onChange={changevaluetreatment}
                        >
                          <option disabled hidden selected>
                            Select Treatment
                          </option>
                          {treatmentdata.map((datatreatment) => {
                            return (
                              <option value={datatreatment}>
                                {datatreatment}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      {/*submit button */}

                      <div>
                        <input
                          readOnly
                          name="find"
                          className="clickbutton"
                          id="signups"
                          value="Find Hospital"
                          onClick={handleClick}
                        />
                      </div>
                    </form>
                  </div>
                </div>

                <TableContainer component={Paper} className="tableedit">
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">
                          Hospital
                        </StyledTableCell>
                        <StyledTableCell align="center">Doctor</StyledTableCell>
                        <StyledTableCell align="center">
                          Book Appointment
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {table}
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                        onSubmit={user.handleSubmit}
                      >
                        <DialogTitle id="responsive-dialog-title">
                          <h3 className="textaligncenter">Book Appointment</h3>
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="dalogbox">
                            <div className="signup-form">
                              <form
                                className="register-form"
                                id="register-form"
                                onSubmit={user.handleSubmit}
                              >
                                {/* Hospital name */}
                                <div className="form-group mb-2">
                                  <label htmlFor="name">
                                    <i className="zmdi zmdi-hospital material-icons-name setcolor"></i>
                                  </label>
                                  <input
                                    style={{ color: "black" }}
                                    type="text"
                                    name="hospitalname"
                                    autoComplete="off"
                                    placeholder="Hospital Name"
                                    className="roshani setcolor"
                                    value={hospitalname}
                                    readOnly
                                  />
                                </div>

                                {/* Hospital email */}
                                <div className="form-group mb-2">
                                  <label htmlFor="name">
                                    <i className="zmdi zmdi-email material-icons-name setcolor"></i>
                                  </label>
                                  <input
                                    style={{ color: "black" }}
                                    type="text"
                                    name="hospitalemail"
                                    autoComplete="off"
                                    placeholder="Hospital Email"
                                    className="roshani setcolor"
                                    value={hospitalemail}
                                    readOnly
                                  />
                                </div>

                                {/* Hospital phone */}
                                <div className="form-group mb-2">
                                  <label htmlFor="phone">
                                    <i className="zmdi zmdi-email material-icons-name setcolor"></i>
                                  </label>
                                  <input
                                    style={{ color: "black" }}
                                    type="text"
                                    name="hospitalphone"
                                    autoComplete="off"
                                    placeholder="Hospital Phone"
                                    className="roshani setcolor"
                                    value={hospitalphone}
                                    readOnly
                                  />
                                </div>

                                {/* Hospital address */}
                                <div className="form-group mb-2">
                                  <label htmlFor="address">
                                    <i className="zmdi zmdi-email material-icons-name setcolor"></i>
                                  </label>
                                  <input
                                    style={{ color: "black" }}
                                    type="text"
                                    name="hospitalphone"
                                    autoComplete="off"
                                    placeholder="Hospital Phone"
                                    className="roshani setcolor"
                                    value={hospitaladdress}
                                    readOnly
                                  />
                                </div>

                                {/* name */}
                                <div className="form-group mb-2">
                                  <label htmlFor="name">
                                    <i className="zmdi zmdi-account material-icons-name setcolor"></i>
                                  </label>
                                  <input
                                    style={{ color: "black" }}
                                    type="text"
                                    name="name"
                                    autoComplete="off"
                                    placeholder="Your Name"
                                    className="roshani setcolor"
                                    value={user.values.name}
                                    onChange={user.handleChange}
                                  />
                                  {user.touched.name && user.errors.name && (
                                    <p className="error-part">
                                      {user.errors.name}
                                    </p>
                                  )}
                                </div>
                                {/* email */}
                                <div className="form-group mb-2">
                                  <label htmlFor="email">
                                    <i className="zmdi zmdi-email material-icons-name setcolor"></i>
                                  </label>
                                  <input
                                    style={{ color: "black" }}
                                    type="email"
                                    name="myemail"
                                    autoComplete="off"
                                    placeholder="Your Email"
                                    className="roshani"
                                    value={myemail}
                                    readOnly
                                  />
                                  {user.touched.email && user.errors.email && (
                                    <p className="error-part">
                                      {user.errors.email}
                                    </p>
                                  )}
                                </div>

                                {/* phone */}
                                <div className="form-group mb-2">
                                  <label htmlFor="phone">
                                    <i className="zmdi zmdi-phone-in-talk material-icons-name setcolor"></i>
                                  </label>
                                  <input
                                    style={{ color: "black" }}
                                    type="text"
                                    name="phone"
                                    autoComplete="off"
                                    placeholder="Your Phone"
                                    className="roshani"
                                    value={user.values.phone}
                                    onChange={user.handleChange}
                                  />
                                  {user.touched.phone && user.errors.phone && (
                                    <p className="error-part">
                                      {user.errors.phone}
                                    </p>
                                  )}
                                </div>

                                {/* Date */}
                                <div className="form-group mb-2">
                                  <label htmlFor="date">
                                    <i className="zmdi zmdi-calendar material-icons-name setcolor"></i>
                                  </label>
                                  <input
                                    style={{ color: "black" }}
                                    type="date"
                                    name="date"
                                    autoComplete="off"
                                    placeholder="dd/mm/yyyy"
                                    className="roshani"
                                    value={user.values.date}
                                    onChange={user.handleChange}
                                  />
                                  {user.touched.date && user.errors.date && (
                                    <p className="error-part">
                                      {user.errors.date}
                                    </p>
                                  )}
                                </div>
                                <div className="form-group form-button">
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    autoFocus
                                    style={{ marginTop: "15px" }}
                                  >
                                    Submit
                                  </Button>
                                  <Button
                                    onClick={handleClose}
                                    variant="contained"
                                    autoFocus
                                    style={{
                                      marginLeft: "15px",
                                      marginTop: "15px",
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </form>
                            </div>
                          </DialogContentText>
                        </DialogContent>
                      </Dialog>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAppointment;
