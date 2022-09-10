import React from "react";
import swal from "sweetalert";
import "./ShowHospital";
import { useState } from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button, Pagination } from "@mui/material";
import Typography from "@mui/material/Typography";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useNavigate } from "react-router-dom";

// for dialog box
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { contextAPi } from "../../../../App";
import YupPassword from "yup-password";
import "yup-phone";
YupPassword(yup);

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const ShowHospital = () => {
  // search bar data
  const [search, setSearch] = useState("");
  // this is for storing are user data
  const [tabledata, setData] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const History = useNavigate();
  const { state, dispatch } = useContext(contextAPi);
  useEffect(() => {
    axios
      .get("/checkuserlogin")
      .then((res) => {
        dispatch({ type: "admin", payload: "admin" });
      })
      .catch((err) => {
        History("/login_user");
      });
  }, []);

  //  activate on loading
  useEffect(() => {
    axios
      .get("/admin/hospital/getdatahospital")
      .then((res) => {
        setData(res.data["data"]);
        setCount(Math.ceil(tabledata.length / 3));
        setFilterdata(res.data["data"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tabledata.length]);

  useEffect(() => {
    const result = tabledata.filter((data) => {
      if (data.hospital_name.toLowerCase().match(search.toLowerCase())) {
        return data.hospital_name.toLowerCase().match(search.toLowerCase());
      }
      if (data.email.toLowerCase().match(search.toLowerCase())) {
        return data.email.toLowerCase().match(search.toLowerCase());
      }
      if (data.license_number.toLowerCase().match(search.toLowerCase())) {
        return data.license_number.toLowerCase().match(search.toLowerCase());
      }
      if (data.state.toLowerCase().match(search.toLowerCase())) {
        return data.state.toLowerCase().match(search.toLowerCase());
      }
      if (data.city.toLowerCase().match(search.toLowerCase())) {
        return data.city.toLowerCase().match(search.toLowerCase());
      }
      if (data.area.toLowerCase().match(search.toLowerCase())) {
        return data.area.toLowerCase().match(search.toLowerCase());
      }
      if (data.address.toLowerCase().match(search.toLowerCase())) {
        return data.address.toLowerCase().match(search.toLowerCase());
      }
      if (data.state_ranking.toLowerCase().match(search.toLowerCase())) {
        return data.state_ranking.toLowerCase().match(search.toLowerCase());
      }
      if (data.city_ranking.toLowerCase().match(search.toLowerCase())) {
        return data.city_ranking.toLowerCase().match(search.toLowerCase());
      }
      if (search === "") {
        return data.name;
      } else {
        let roshan = data.phone.toString();
        return roshan.match(search);
      }
    });
    setFilterdata(result);
    if (search === "") {
      setCount(Math.ceil(tabledata.length / 3));
    } else {
      setCount(Math.ceil(filterdata.length / 3));
    }
  }, [search]);

  const [UserUpdate, setUserUpdate] = useState(null);

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  var userdetails;
  const handleClickOpen = (event) => {
    userdetails = {
      hospital_name: event.target.getAttribute("data-hospital_name"),
      email: event.target.getAttribute("data-email"),
      license_number: event.target.getAttribute("data-license_number"),
      phone: event.target.getAttribute("data-phone"),
      state: event.target.getAttribute("data-state"),
      city: event.target.getAttribute("data-city"),
      area: event.target.getAttribute("data-area"),
      address: event.target.getAttribute("data-address"),
      state_ranking: event.target.getAttribute("data-state_ranking"),
      city_ranking: event.target.getAttribute("data-city_ranking"),
    };
    setOpen(true);
    setUserUpdate(userdetails);
  };

  const handleClose = () => {
    setOpen(false);
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
    email: yup.string().email().required(),
    license_number: yup.string().required(),
    phone: yup.string().phone().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    area: yup.string().required(),
    address: yup.string().required(),
    state_ranking: yup.number().required(),
    city_ranking: yup.number().required(),
  });
  const users = useFormik({
    initialValues: UserUpdate === null ? initialValues : UserUpdate,
    validationSchema: validate,
    onSubmit: async (values) => {
      const {
        hospital_name,
        email,
        license_number,
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
          email,
          license_number,
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
        swal("Updated", "User Updated Successfully!", "success").then(() => {
          handleClose();
          axios
            .get("/admin/hospital/getdatahospital")
            .then((res) => {
              setFilterdata(res.data["data"]);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    },
    enableReinitialize: true,
  });

  //  delete user from database
  const deleteuser = (event) => {
    let email = event.target.getAttribute("data-email");
    // console.log(email);
    axios
      .post("/admin/deletehospital", { email })
      .then((res) => {
        swal("Deleted", "Hospital Deleted Successfully!", "success").then(
          (value) => {
            const deletedata = tabledata;
            const filterdata = deletedata.filter(
              (item) => item.email !== email
            );
            setData(filterdata);
            setCount(Math.ceil(filterdata.length / 2));
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // storing are user data into table
  let table;
  if (filterdata) {
    table = filterdata
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row, index) => {
        return (
          <div className="col-lg-4 col-md-6 col-12 takemargin">
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {row.hospital_name}
                </Typography>
                <Typography variant="body2">
                  {row.email}
                  <br />
                  license-no : {row.license_number}
                  <br />
                  Phone : {row.phone}
                  <br />
                  State : {row.state}
                  <br />
                  City : {row.city}
                  <br />
                  Area : {row.area}
                  <br />
                  Adress : {row.address}
                  <br />
                  State-Rank : {row.state_ranking}
                  <br />
                  City-rank : {row.city_ranking}
                </Typography>
              </CardContent>
              <CardActions className="aligncenter">
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  data-email={row.email}
                  data-hospital_name={row.hospital_name}
                  data-phone={row.phone}
                  data-license_number={row.license_number}
                  data-state={row.state}
                  data-city={row.city}
                  data-area={row.area}
                  data-address={row.address}
                  data-state_ranking={row.state_ranking}
                  data-city_ranking={row.city_ranking}
                  onClick={handleClickOpen}
                >
                  {" "}
                  Update{" "}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  data-email={row.email}
                  onClick={deleteuser}
                  size="small"
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </div>
        );
      });
  }

  return (
    <div>
      <div className="showtreatment-1">
        <div className="showtreatment-2">
          <div className="showtreatment-4">
            <Link to="/admin/home" className="showtreatment-5">
              Home
            </Link>{" "}
            / Show Hospital
          </div>
          <div className="showtreatment-3">Show Hospital</div>
        </div>
      </div>
      <div className="container show-302">
        <h2 className="heading">Registered Hospital</h2>
        <div className="col-md-6 col-12  sita"></div>
        <div className="row paper">
          <Paper
            className="col-lg-6 col-md-8 col-10"
            component="form"
            sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
          >
            <IconButton sx={{ p: "10px" }} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search User"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton
              readOnly
              style={{ cursor: "default" }}
              sx={{ p: "10px" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </Paper>
        </div>

        <div className="row centercards">
          {table}
          <div className="col-12 show-301">
            <Pagination
              count={count}
              color="primary"
              variant="outlined"
              onChange={(event, value) => setPage(value - 1)}
            />
          </div>
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          onSubmit={users.handleSubmit}
        >
          <DialogTitle id="responsive-dialog-title">
            <h3 className="textaligncenter">Update Hospital</h3>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="dalogbox">
              <div className="signup-form">
                <form
                  className="register-form"
                  id="register-form"
                  onSubmit={users.handleSubmit}
                >
                  {/* hospital_name */}
                  <div className="form-group mb-2">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-hospital material-icons-name setcolor"></i>
                    </label>
                    <input
                      type="text"
                      name="hospital_name"
                      autoComplete="off"
                      placeholder="Hospital Name"
                      className="roshan"
                      value={users.values.hospital_name}
                      onChange={users.handleChange}
                      style={{ color: "black" }}
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
                    <label htmlFor="name">
                      <i className="zmdi zmdi-email material-icons-name setcolor"></i>
                    </label>
                    <input
                      style={{ color: "black" }}
                      type="email"
                      name="email"
                      autoComplete="off"
                      placeholder="Your Email"
                      className="roshan"
                      value={users.values.email}
                      readOnly
                    />
                  </div>

                  {/* license_number */}
                  <div className="form-group mb-2">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-local-hospital material-icons-name setcolor"></i>
                    </label>
                    <input
                      type="text"
                      name="license_number"
                      autoComplete="off"
                      placeholder="Hospital license Number"
                      className="roshan"
                      value={users.values.license_number}
                      onChange={users.handleChange}
                      style={{ color: "black" }}
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
                    <label htmlFor="name">
                      <i className="zmdi zmdi-map material-icons-name setcolor"></i>
                    </label>
                    <input
                      type="text"
                      name="state"
                      autoComplete="off"
                      placeholder="Hospital State"
                      className="roshan"
                      value={users.values.state}
                      onChange={users.handleChange}
                      style={{ color: "black" }}
                    />
                    {users.touched.state && users.errors.state && (
                      <p className="error-part">{users.errors.state}</p>
                    )}
                  </div>

                  {/* city */}
                  <div className="form-group mb-2">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-map material-icons-name setcolor"></i>
                    </label>
                    <input
                      type="text"
                      name="city"
                      autoComplete="off"
                      placeholder="Hospital City"
                      className="roshan"
                      value={users.values.city}
                      onChange={users.handleChange}
                      style={{ color: "black" }}
                    />
                    {users.touched.city && users.errors.city && (
                      <p className="error-part">{users.errors.city}</p>
                    )}
                  </div>

                  {/* area */}
                  <div className="form-group mb-2">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-map material-icons-name setcolor"></i>
                    </label>
                    <input
                      type="text"
                      name="area"
                      autoComplete="off"
                      placeholder="Hospital Area"
                      className="roshan"
                      value={users.values.city}
                      onChange={users.handleChange}
                      style={{ color: "black" }}
                    />
                    {users.touched.area && users.errors.area && (
                      <p className="error-part">{users.errors.area}</p>
                    )}
                  </div>

                  {/* address */}
                  <div className="form-group mb-2">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-map material-icons-name setcolor"></i>
                    </label>
                    <input
                      type="text"
                      name="address"
                      autoComplete="off"
                      placeholder="Hospital Address"
                      className="roshan"
                      value={users.values.address}
                      onChange={users.handleChange}
                      style={{ color: "black" }}
                    />
                    {users.touched.address && users.errors.address && (
                      <p className="error-part">{users.errors.address}</p>
                    )}
                  </div>

                  {/* state_ranking */}
                  <div className="form-group mb-2">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-star material-icons-name setcolor"></i>
                    </label>
                    <input
                      type="text"
                      name="state_ranking"
                      autoComplete="off"
                      placeholder="Hospital state_ranking"
                      className="roshan"
                      value={users.values.state_ranking}
                      onChange={users.handleChange}
                      style={{ color: "black" }}
                    />
                    {users.touched.state_ranking &&
                      users.errors.state_ranking && (
                        <p className="error-part">
                          {users.errors.state_ranking}
                        </p>
                      )}
                  </div>

                  {/* city_ranking */}
                  <div className="form-group mb-2">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-star material-icons-name setcolor"></i>
                    </label>
                    <input
                      type="text"
                      name="city_ranking"
                      autoComplete="off"
                      placeholder="Hospital City Ranking"
                      className="roshan"
                      value={users.values.city_ranking}
                      onChange={users.handleChange}
                      style={{ color: "black" }}
                    />
                    {users.touched.city_ranking &&
                      users.errors.city_ranking && (
                        <p className="error-part">
                          {users.errors.city_ranking}
                        </p>
                      )}
                  </div>

                  {/*phone */}
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
                    <Button
                      type="submit"
                      variant="contained"
                      autoFocus
                      style={{ marginTop: "15px" }}
                    >
                      Update
                    </Button>
                    <Button
                      onClick={handleClose}
                      variant="contained"
                      autoFocus
                      style={{ marginLeft: "15px", marginTop: "15px" }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ShowHospital;
