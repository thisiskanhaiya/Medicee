import React from "react";
import "./ShowTreatment.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { contextAPi } from "../../../App";
import { Pagination } from "@mui/material";
const ShowTreatment = () => {
  const [val, setData] = useState([]);
  const [vals, setDatas] = useState([]);
  const History = useNavigate();
  const [count, setCount] = useState(0);
  const [counting, setCounting] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const { state, dispatch } = useContext(contextAPi);

  useEffect(() => {
    let hospital_email;
    axios
      .get("/hospital/logged")
      .then((res) => {
        dispatch({ type: "hospital", payload: "hospital" });
        hospital_email = res.data["hospital"]["email"];
        findappointment(hospital_email);
        findapproved(hospital_email);
      })
      .catch((err) => {
        History("/login_hospital");
      });
  });

  const findappointment = (hospital_email) => {
    let appointmentdata;
    axios
      .post("/hospital/findappointment", { hospital_email })
      .then((res) => {
        appointmentdata = res.data["data"];
        setData(appointmentdata);
        setCount(Math.ceil(val.length / 2));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const findapproved = (hospital_email) => {
    let appointmentdatas;
    axios
      .post("/hospital/findapproved", { hospital_email })
      .then((res) => {
        appointmentdatas = res.data["data"];
        setDatas(appointmentdatas);
        // console.log(vals)
        setCounting(Math.ceil(vals.length / 2));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const acceptHandler = async (event) => {
    let hospital_name = event.target.getAttribute("data-hospital");
    let hospital_email = event.target.getAttribute("data-hospitalEmail");
    let hospital_phone = event.target.getAttribute("data-hospitalPhone");
    let hospital_address = event.target.getAttribute("data-hospitalAddres");
    let name = event.target.getAttribute("data-name");
    let date = event.target.getAttribute("data-date");
    let treatment_name = event.target.getAttribute("data-treatment_name");
    let email = event.target.getAttribute("data-email");
    let phone = event.target.getAttribute("data-phone");
    await axios.post("/hospital/flagAccept", {
      hospital_name,
      hospital_email,
      hospital_phone,
      hospital_address,
      name,
      date,
      treatment_name,
      email,
      phone,
    });
  };

  const rejectHandler = async (event) => {
    let hospital_name = event.target.getAttribute("data-hospital");
    let hospital_email = event.target.getAttribute("data-hospitalEmail");
    let hospital_phone = event.target.getAttribute("data-hospitalPhone");
    let hospital_address = event.target.getAttribute("data-hospitalAddres");
    let name = event.target.getAttribute("data-name");
    let date = event.target.getAttribute("data-date");
    let treatment_name = event.target.getAttribute("data-treatment_name");
    let email = event.target.getAttribute("data-email");
    let phone = event.target.getAttribute("data-phone");
    await axios.post("/hospital/flagReject", {
      hospital_name,
      hospital_email,
      hospital_phone,
      hospital_address,
      name,
      date,
      treatment_name,
      email,
      phone,
    });
  };

  const Pending = [...val]
    .reverse()
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
        return (
          <div className="col-12 mt-3 mb-3 centerall">
            <Card style={{ width: "25rem" }}>
              <Card.Body>
                <Card.Title className="show-20">{row.treatment_name}</Card.Title>
                <Card.Text>Booked Date: {row.date}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <div className="bold">Patient Name</div> {row.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="bold">Patient Email</div> {row.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="bold">Patient No.</div> {row.phone}
                </ListGroup.Item>
              </ListGroup>
              <Card.Body>
                {/* <Button variant="success">Accept</Button>
                        <Button variant="danger">Reject</Button> */}

                <button
                  data-hospital={row.hospital_name}
                  data-hospitalEmail={row.hospital_email}
                  data-hospitalPhone={row.hospital_phone}
                  data-hospitalAddress={row.hospital_address}
                  data-date={row.date}
                  data-treatment_name={row.treatment_name}
                  data-name={row.name}
                  data-email={row.email}
                  data-phone={row.phone}
                  onClick={acceptHandler}
                  className="btn btn-success mx-4"
                >
                  Accept
                </button>

                <button
                  data-hospital={row.hospital_name}
                  data-hospitalEmail={row.hospital_email}
                  data-hospitalPhone={row.hospital_phone}
                  data-hospitalAddress={row.hospital_address}
                  data-date={row.date}
                  data-treatment_name={row.treatment_name}
                  data-name={row.name}
                  data-email={row.email}
                  data-phone={row.phone}
                  onClick={rejectHandler}
                  className="btn btn-danger"
                >
                  Reject
                </button>
              </Card.Body>
            </Card>
          </div>
        );
    });

    const Approveded = [...vals]
    .reverse()
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
        return (
          <div className="col-12 mt-3 mb-3 centerall">
            <Card style={{ width: "25rem" }}>
              <Card.Body>
                <Card.Title className="show-20">{row.treatment_name}</Card.Title>
                <Card.Text>Booked Date: {row.date}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <div className="bold">Patient Name</div> {row.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="bold">Patient Email</div> {row.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="bold">Patient No.</div> {row.phone}
                </ListGroup.Item>
              </ListGroup>
              <Card.Body>
              Status:
              <button
                aria-readonly
                className="btn btn-success mx-4 defaultsbutton"
              >
                Approved
              </button>
              </Card.Body>
            </Card>
          </div>
        );
    });

  

  return (
    <div>
      <div className="showtreatment-1">
        <div className="showtreatment-2">
          <div className="showtreatment-4">
            <Link to="/hospital/home" className="showtreatment-5">
              Home
            </Link>{" "}
            / Show Appointment
          </div>
          <div className="showtreatment-3">Show Appointment</div>
        </div>
      </div>
      <div className="container roshan">
        <div className="row roshani">
          <div className="col-12 sita">
            <h2 className="heading">Patient Appointments</h2>
            {Pending}
            <div className="col-12 show-311">
              <Pagination
                count={count}
                color="primary"
                variant="outlined"
                onChange={(event, value) => setPage(value - 1)}
              />
            </div>
          </div>
            <h2 className="heading">Approved Appointments</h2>
            {Approveded}
            <div className="col-12 show-3112">
              <Pagination
                count={counting}
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

export default ShowTreatment;
