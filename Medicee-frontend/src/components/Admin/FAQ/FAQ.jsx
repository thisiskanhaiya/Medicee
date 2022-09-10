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
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { contextAPi } from "../../../App";
import "./FAQ.css";
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

const FAQ = () => {
  // search bar data
  const [search, setSearch] = useState("");
  // this is for storing are user data
  const [tabledata, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
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

  // write code for backend connect to frontend
  const History = useNavigate();

  //  activate on loading
  useEffect(() => {
    axios
      .get("/admin/faq/finddata")
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
      if (data.fullname.toLowerCase().match(search.toLowerCase())) {
        return data.fullname.toLowerCase().match(search.toLowerCase());
      }
      if (data.email.toLowerCase().match(search.toLowerCase())) {
        return data.email.toLowerCase().match(search.toLowerCase());
      }
      if (data.address.toLowerCase().match(search.toLowerCase())) {
        return data.address.toLowerCase().match(search.toLowerCase());
      }
      if (data.query.toLowerCase().match(search.toLowerCase())) {
        return data.query.toLowerCase().match(search.toLowerCase());
      }
      if (search === "") {
        return data.name;
      } else {
        let roshan = data.contact.toString();
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
  const [faq, setfaq] = useState(null);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  var userdetails;
  const handleClickOpen = (event) => {
    userdetails = {
      email: event.target.getAttribute("data-email"),
      question: event.target.getAttribute("data-question"),
      answer: "",
    };
    setOpen(true);
    setUserUpdate(userdetails);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changefaq = (e) => {
    setfaq(e.target.value);
  };

  const initialValues = {
    email: "",
    question: "",
    answer: "",
  };
  const validate = yup.object({
    email: yup.string().email().required(),
    question: yup.string().min(2).required(),
    answer: yup.string().min(2).required(),
  });
  const users = useFormik({
    initialValues: UserUpdate === null ? initialValues : UserUpdate,
    validationSchema: validate,
    onSubmit: async (values) => {
      const { email, question, answer } = values;
      if (faq === "Yes") {
        const res = await fetch("/hospital/admin/answer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            question,
            answer,
          }),
        });
        const data = await res.json();
        swal("Send Message", "Answer Send Successfully", "success").then(() => {
          axios
            .post("/admin/contact/delete", {
              email,
              question,
              answer,
            })
            .then((res) => {
              const deletedata = tabledata;
              const filterdata = deletedata.filter(
                (item) => item.email !== email && item.query !== question
              );
              setData(filterdata);
              setCount(Math.ceil(filterdata.length / 2));
              handleClose();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      } else if (faq === "No") {
        const res = await fetch("/hospital/admin/answerno", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            question,
            answer,
          }),
        });
        const data = await res.json();
        swal("Send Message", "Answer Send Successfully", "success").then(() => {
          axios
            .post("/admin/contact/delete", {
              email,
              question,
              answer,
            })
            .then((res) => {
              const deletedata = tabledata;
              const filterdata = deletedata.filter(
                (item) => item.email !== email && item.query !== question
              );
              setData(filterdata);
              setCount(Math.ceil(filterdata.length / 2));
              handleClose();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      } else {
        const res = await fetch("/hospital/admin/answerno", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            question,
            answer,
          }),
        });
        const data = await res.json();
        swal("Send Message", "Answer Send Successfully", "success").then(() => {
          axios
            .post("/admin/contact/delete", {
              email,
              question,
              answer,
            })
            .then((res) => {
              const deletedata = tabledata;
              const filterdata = deletedata.filter(
                (item) => item.email !== email && item.query !== question
              );
              setData(filterdata);
              handleClose();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
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
                <Typography variant="h6" component="div">
                  Q. {row.query}
                </Typography>
                <Typography variant="body2">
                  Name: {row.fullname}
                  <br />
                  Email: {row.email}
                  <br />
                  Phone : {row.contact}
                  <br />
                  Address : {row.address}
                  <br />
                  {/* State : {row.state_}
                <br />
                City : {row.city}
                <br />
                Zip : {row.zip}
                <br /> */}
                </Typography>
              </CardContent>
              <CardActions className="aligncenter">
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  data-email={row.email}
                  data-question={row.query}
                  onClick={handleClickOpen}
                >
                  {" "}
                  Answer{" "}
                </Button>
              </CardActions>
            </Card>
          </div>
        );
      });
  }

  return (
    <div>
      <div className="faqs-1">
        <div className="faqs-2">
          <div className="faqs-4">
            <Link to="/admin/home" className="faqs-5">
              Home
            </Link>{" "}
            / Asked Questions
          </div>
          <div className="faqs-3">Asked Questions</div>
        </div>
      </div>
      <div className="container show-302">
        <h2 className="heading">Freaquently Asked Questions</h2>
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
              placeholder="Search Here"
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

                  {/* Query */}
                  <div className="form-group mb-2">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-hospital material-icons-name setcolor"></i>
                    </label>
                    <input
                      type="text"
                      name="question"
                      autoComplete="off"
                      placeholder="Query"
                      className="roshan"
                      value={users.values.question}
                      onChange={users.handleChange}
                      style={{ color: "black" }}
                    />
                    {users.touched.question && users.errors.question && (
                      <p className="error-part">{users.errors.question}</p>
                    )}
                  </div>

                  {/* answer */}
                  <div className="form-group mb-2">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-map material-icons-name setcolor"></i>
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

                  {/* faq */}
                  <div className="form-group mb-2">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-star material-icons-name"></i>
                    </label>

                    <select
                      name="faq"
                      className="dropdown"
                      onChange={changefaq}
                    >
                      <option disabled hidden selected>
                        Show On FAQ
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
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

export default FAQ;
