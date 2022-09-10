import "./PendingHospital.css";
import React from "react";
import swal from "sweetalert";
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
import { useNavigate } from "react-router-dom";

// for dialog box
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import { contextAPi } from "../../../../App";
import YupPassword from "yup-password";
import "yup-phone";
YupPassword(yup);

const PendingHospital = () => {
  const [search, setSearch] = useState("");
  const [tabledata, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [filterdata, setFilterdata] = useState([]);

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

  useEffect(() => {
    axios
      .get("/admin/hospital/gethospitalpendingdata")
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

  const accepthospital = (event) => {
    let email = event.target.getAttribute("data-email");
    let flag = 1;
    // console.log(email);
    axios
      .put("/admin/hospital/hospitalaccepted", { email, flag })
      .then((res) => {
        swal("Accepted", "Hospital Approval Accepted", "success").then(
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

  const [UserUpdate, setUserUpdate] = useState(null);

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  var userdetails;
  const handleClickOpen = (event) => {
    userdetails = {
      email: event.target.getAttribute("data-email"),
      answer: "",
    };
    setOpen(true);
    setUserUpdate(userdetails);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues = {
    email: "",
    answer: "",
  };
  const validate = yup.object({
    email: yup.string().email().required(),
    answer: yup.string().min(2).required(),
  });
  const users = useFormik({
    initialValues: UserUpdate === null ? initialValues : UserUpdate,
    validationSchema: validate,
    onSubmit: async (values) => {
      const { email, answer } = values;
      let flag = 2;
      axios
        .put("/admin/hospital/hospitalrejeted", { email, answer, flag })
        .then((res) => {
          swal("Rejected", "Hospital Approval Rejected", "error").then(
            (value) => {
              const deletedata = tabledata;
              const filterdata = deletedata.filter(
                (item) => item.email !== email
              );
              setData(filterdata);
              setCount(Math.ceil(filterdata.length / 2));
              setOpen(false);
              axios
                .post("/admin/hospital/deletehospitaldata", { email })
                .then((res) => {
                  console.log("hospital deleted");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    enableReinitialize: true,
  });
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
                  onClick={accepthospital}
                >
                  {" "}
                  Accept{" "}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  data-email={row.email}
                  onClick={handleClickOpen}
                  size="small"
                >
                  Reject
                </Button>
              </CardActions>
            </Card>
          </div>
        );
      });
  }

  return (
    <div>
      <div className="treatment-1">
        <div className="treatment-2">
          <div className="treatment-4">
            <Link to="/admin/home" className="treatment-5">
              Home
            </Link>{" "}
            / Pending
          </div>
          <div className="treatment-3">Pending</div>
        </div>
      </div>
      <div className="container show-302">
        <h2 className="heading">Pending Hospital</h2>
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
            <h3 className="textaligncenter">Admin Answer</h3>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="dalogbox">
              <div className="signup-form">
                <form
                  className="register-form"
                  id="register-form"
                  onSubmit={users.handleSubmit}
                >
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

                  {/* answer */}
                  <div className="form-group mb-2">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-star material-icons-name setcolor"></i>
                    </label>
                    <input
                      type="text"
                      name="answer"
                      autoComplete="off"
                      placeholder="Answer"
                      className="roshan"
                      value={users.values.answer}
                      onChange={users.handleChange}
                      style={{ color: "black" }}
                    />
                    {users.touched.answer && users.errors.answer && (
                      <p className="error-part">{users.errors.answer}</p>
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
                      Submit
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

export default PendingHospital;
