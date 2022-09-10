import React from "react";
import swal from "sweetalert";
import "./ShowUser.css";
import { useState } from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

// for dialog box
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { contextAPi } from "../../../App";
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

const ShowUser = () => {
  const History = useNavigate();

  // search bar data
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  // this is for storing are user data
  const [tabledata, setData] = useState([]);

  const [filterdata, setFilterdata] = useState([]);
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
      .get("/admin/user/getdatauser")
      .then((res) => {
        setData(res.data["data"]);
        setCount(Math.ceil(tabledata.length / 3));
        // search data set value
        setFilterdata(res.data["data"]);
      })
      .catch((err) => {
        History("/login_user");
      });
  }, [tabledata.length]);

  useEffect(() => {
    const result = tabledata.filter((data) => {
      if (data.name.toLowerCase().match(search.toLowerCase())) {
        return data.name.toLowerCase().match(search.toLowerCase());
      }
      if (data.email.toLowerCase().match(search.toLowerCase())) {
        return data.email.toLowerCase().match(search.toLowerCase());
      }
      if (search === "") {
        
        return data.name;
      } 
      else {
        let roshan = data.phone.toString();
        return roshan.match(search);
      }
    });
    setFilterdata(result);
    if (search === "") {
      setCount(Math.ceil(tabledata.length / 3));
    }
    else{
      setCount(Math.ceil(filterdata.length / 3));
    }
    
  }, [search]);

  const [UserUpdate, setUserUpdate] = useState(null);

  const [open, setOpen] = React.useState(false);

  const theme = useTheme();

  var userdetails;
  const handleClickOpen = (event) => {
    userdetails = {
      name: event.target.getAttribute("data-name"),
      email: event.target.getAttribute("data-email"),
      phone: event.target.getAttribute("data-phone"),
    };
    setOpen(true);
    setUserUpdate(userdetails);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues = {
    name: "",
    email: "",
    phone: "",
  };
  const validate = yup.object({
    name: yup.string().min(2).required(),
    email: yup.string().email().required(),
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
          handleClose();
          axios
            .get("/admin/user/getdatauser")
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
      .post("/user/deleteuser", { email })
      .then((res) => {
        swal("Deleted", "User Deleted Successfully!", "success").then(
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
                  {row.name}
                </Typography>
                <Typography variant="body2">
                  {row.email}
                  <br />
                  {row.phone}
                </Typography>
              </CardContent>
              <CardActions className="aligncenter">
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  data-email={row.email}
                  data-name={row.name}
                  data-phone={row.phone}
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
    <div >
      <div className="show-1">
        <div className="show-2">
          <div className="show-4">
            <Link to="/admin/home" className="show-5">
              Home
            </Link>{" "}
            / Users
          </div>
          <div className="show-3">Users</div>
        </div>
      </div>
      <div className="container show-302">
        <h2 className="heading">Registered User</h2>
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
            <h3 className="textaligncenter">Update User</h3>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="dalogbox">
              <div className="signup-form">
                <form
                  className="register-form"
                  id="register-form"
                  onSubmit={users.handleSubmit}
                >
                  {/* name */}
                  <div className="form-group mb-2">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-account material-icons-name setcolor"></i>
                    </label>
                    <input
                      type="text"
                      // change
                      name="name"
                      autoComplete="off"
                      placeholder="Your Name"
                      className="roshan"
                      //  chnage
                      value={users.values.name}
                      onChange={users.handleChange}
                      style={{ color: "black" }}
                    />
                    {/* change  */}
                    {users.touched.name && users.errors.name && (
                      <p className="error-part">{users.errors.name}</p>
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

export default ShowUser;
