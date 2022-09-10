import React from "react";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button, Pagination } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "./ShowAppointment.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { contextAPi } from "../../../../App";
const ShowAppointment = () => {
  const History = useNavigate();
  // const [val, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [tabledata, setData] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const { state, dispatch } = useContext(contextAPi);

  useEffect(() => {
    axios
      .get("/checkuserlogin")
      .then((res) => {
        dispatch({ type: "admin", payload: "admin" });
        findappointment();
      })
      .catch((err) => {
        History("/login_user");
      });
  }, [tabledata.length]);

  const findappointment = () => {
    let appointmentdata;
    axios
      .post("/admin/hospital/findappointment")
      .then((res) => {
        setData(res.data["data"]);
        setCount(Math.ceil(tabledata.length / 3));
        setFilterdata(res.data["data"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const result = tabledata.filter((data) => {
      if (data.treatment_name.toLowerCase().match(search.toLowerCase())) {
        return data.treatment_name.toLowerCase().match(search.toLowerCase());
      }
      if (data.date.toLowerCase().match(search.toLowerCase())) {
        return data.date.toLowerCase().match(search.toLowerCase());
      }
      if (data.hospital_email.toLowerCase().match(search.toLowerCase())) {
        return data.hospital_email.toLowerCase().match(search.toLowerCase());
      }
      if (data.hospital_name.toLowerCase().match(search.toLowerCase())) {
        return data.hospital_name.toLowerCase().match(search.toLowerCase());
      }
      if (data.name.toLowerCase().match(search.toLowerCase())) {
        return data.name.toLowerCase().match(search.toLowerCase());
      }
      if (data.email.toLowerCase().match(search.toLowerCase())) {
        return data.email.toLowerCase().match(search.toLowerCase());
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

  let Approved;
  if (filterdata) {
    Approved = filterdata
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row, index) => {
        if (row.flag === 1) {
          return (
            <div className="col-lg-4 col-md-6 col-12 takemargin">
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {row.treatment_name}
                  </Typography>
                  <Typography variant="body2">
                    {row.date}
                    <br />
                    Patient Name : {row.name}
                    <br />
                    Patient Email : {row.email}
                    <br />
                    Patient phone : {row.phone}
                    <br />
                    Hospital : {row.hospital_name}
                    <br />
                    Hospital Email : {row.hospital_email}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
        }
      });
  }
  return (
    <div>
      <div className="add-1">
        <div className="add-2">
          <div className="add-4">
            <Link to="/admin/home" className="add-5">
              Home
            </Link>{" "}
            / Show Appointment
          </div>
          <div className="add-3">Show Appointment</div>
        </div>
      </div>
      <div className="container ramu show-302">
        <h2 className="heading">Appointments</h2>

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
          {Approved}
          <div className="col-12 show-301">
            <Pagination
              count={count}
              color="primary"
              variant="outlined"
              onChange={(event, value) => setPage(value - 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowAppointment;
