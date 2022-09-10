import React from "react";
import Topspecialist from "./Topspecialist";
import "./Home.css";
import Healthcare from "./Healthcare";
import Count from "./Count";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineCalendar } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { FaIdCard } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import NewsApi from "./NewsApi";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button, Pagination } from "@mui/material";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

function Home() {
  const [states, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [area, setArea] = useState([]);
  const [treatmentdata, setTreatment] = useState([]);
  const [treatmnetname, setTreatmnetname] = useState(null);
  const [tabledata, setTable] = useState([]);
  const History = useNavigate();
  const [data, setData] = useState({
    state: "",
    city: "",
    area: "",
    treatment: "",
  });

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
      .post("/getdata/get", data)
      .then((res) => {
        if (res.status === 400) {
          swal("Error", "Data not found", "warning");
        } else {
          setTable(res.data.result);
          console.log(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendnextpage = () => {
    History("/user/show_appointment");
  };

  // storing are user data into table
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
        <div className="col-lg-4 col-md-6 col-12 takemargin">
          <Card sx={{ minWidth: 350, minHeight: 350 }} className="home-card">
            <CardContent>
              <Typography variant="h5" component="div">
                {row.hospital_name}
              </Typography>
              <Typography variant="body2">
                
                <br />
                <strong>Email :</strong> {row.email}
                <br />
                <br />
                <strong>Doctor :</strong> {roshan}
                <br />
                <br />
                <strong>Phone :</strong> {row.phone}
                <br />
                <br />
                <strong>Adress :</strong> {row.address}
                <br />
                {/* City-Rank : {row.city_ranking} */}
              </Typography>
            </CardContent>
            {/* <CardActions className="aligncenter">
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={sendnextpage}
              >
                Book
              </Button>
            </CardActions> */}
          </Card>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="container home-1">
        <div className="row">
          <div className="col-12 text_doctors">
            <h1>
              Find local <span> </span>
            </h1>
            <h1>who take your insurance</h1>
          </div>

          <div className="col-12 row mt-5 mb-5 home-9">
            <div className="col-lg-3 col-md-6 col-12 row">
              <AiOutlineSearch className="col-md-2 col-2 home-3" />
              <select
                className="dropdown col-md-10 col-10 homeselect-1"
                name="state"
                onChange={changeSelectOptionHandler}
              >
                <option disabled hidden selected>
                  Select Your State..
                </option>
                {states.map((state) => {
                  return <option value={state}>{state}</option>;
                })}
              </select>
            </div>
            <div className="col-lg-3 col-md-6 col-12 row">
              <GoLocation className="col-md-2 col-2 home-3" />
              <select
                className="dropdown col-md-10 col-10 homeselect-1"
                type="text"
                name="city"
                onChange={changeSelect}
              >
                <option disabled hidden selected>
                  Select Your City..
                </option>

                {city.map((datacity) => {
                  return <option value={datacity}>{datacity}</option>;
                })}
              </select>
            </div>
            <div className="col-lg-3 col-md-6 col-12 row">
              <AiOutlineCalendar className="col-md-2 col-2 home-3" />
              <select
                className="dropdown col-md-10 col-10 homeselect-1"
                type="text"
                name="area"
                onChange={changevalue}
              >
                <option disabled hidden selected>
                  Select Your Area..
                </option>
                {area.map((dataarea) => {
                  return <option value={dataarea}>{dataarea}</option>;
                })}
              </select>
            </div>
            <div className="col-lg-3 col-md-6 col-12 row">
              <FaIdCard className="col-md-2 col-2 home-3" />
              <select
                className="dropdown col-md-10 col-10 homeselect-1"
                type="text"
                name="treatment"
                onChange={changevaluetreatment}
              >
                <option disabled hidden selected>
                  Select Your Treatment..
                </option>
                {treatmentdata.map((datatreatment) => {
                  return <option value={datatreatment}>{datatreatment}</option>;
                })}
              </select>
            </div>

            <button
              readOnly
              name="find"
              value="Find Hospital"
              onClick={handleClick}
              className="col-lg-3 col-md-4  col-6 mt-3 mb-3 home-4"
            >
              Search Top Hospital
            </button>
          </div>
        </div>
        <div className="row centercards mb-5">{table}</div>
      </div>

      <Healthcare />
      <Count />
      <NewsApi/>
      {/* <Topspecialist /> */}

      {/* <Contact /> */}
      {/* add code */}
    </div>
  );
}

export default Home;
