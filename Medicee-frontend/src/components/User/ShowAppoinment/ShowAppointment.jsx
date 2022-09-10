import React from "react";
import swal from "sweetalert";
import "./ShowAppointment.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { contextAPi } from "../../../App";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
const ShowAppointment = () => {
  const { state, dispatch } = useContext(contextAPi);
  const [count, setCount] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const History = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    let user_email;
    axios
      .get("/user/logged")
      .then((res) => {
        dispatch({ type: "user", payload: "user" });
        user_email = res.data["user"]["email"];
        findappointment(user_email);
      })
      .catch((err) => {
        console.log("catch block");
        History("/login_user");
      });
  });

  const findappointment = (user_email) => {
    let appointmentdata;
    axios
      .post("/user/findappointment", { user_email })
      .then((res) => {
        appointmentdata = res.data["data"];
        setData(appointmentdata);
        setCount(Math.ceil(data.length / 2));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hello = (event) => {
    let hospital_name = event.target.getAttribute("data-hospital_name");
    let hospital_email = event.target.getAttribute("data-hospital_email");
    let hospital_phone = event.target.getAttribute("data-hospital_phone");
    let hospital_address = event.target.getAttribute("data-hospital_address");
    let treatment_name = event.target.getAttribute("data-treatment_name");
    let date = event.target.getAttribute("data-date");

    //  console.log(hospital_name , hospital_email , hospital_address , hospital_phone ,treatment_name , date);
    axios
      .post("/user/deleteAppointment", {
        hospital_name,
        hospital_email,
        hospital_address,
        hospital_phone,
        treatment_name,
        date,
      })
      .then((res) => {
        swal("Canceled", "Appointment Deleted Successfully!", "success");
        setCount(Math.ceil(data.length / 2));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const kan = [...data]
    .reverse()
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => {
      if (row.flag === 0) {
        return (
          <div className="col-lg-6 col-md-6 col-12 centerall">
            <Card style={{ width: "22rem" }}>
              <Card.Body>
                <Card.Title className="show-20">
                  {row.treatment_name}
                </Card.Title>
                <Card.Text>Booked Date: {row.date}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <div className="bold">Hospital Name</div> {row.hospital_name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="bold">Hospital Email</div>{" "}
                  {row.hospital_email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="bold">Hospital No.</div> {row.hospital_phone}
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="bold">Hospital Address</div>{" "}
                  {row.hospital_address}
                </ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <button
                  className="remove btn btn-danger"
                  data-hospital_name={row.hospital_name}
                  data-hospital_email={row.hospital_email}
                  data-hospital_phone={row.hospital_phone}
                  data-hospital_address={row.hospital_address}
                  data-treatment_name={row.treatment_name}
                  data-date={row.date}
                  onClick={hello}
                >
                  Cancel
                </button>
              </Card.Body>
            </Card>
          </div>
        );
      }
      if (row.flag === 1) {
        return (
          <div className="col-lg-6 col-md-6 col-12 centerall">
            <Card style={{ width: "22rem" }}>
              <Card.Body>
                <Card.Title className="show-20">
                  {row.treatment_name}
                </Card.Title>
                <Card.Text>Booked Date: {row.date}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <div className="bold">Hospital Name</div> {row.hospital_name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="bold">Hospital Email</div>{" "}
                  {row.hospital_email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="bold">Hospital No.</div> {row.hospital_phone}
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="bold">Hospital Address</div>{" "}
                  {row.hospital_address}
                </ListGroup.Item>
              </ListGroup>
              <Card.Body>
                Status :{" "}
                <button className="btn btn-success show-23">Approved</button>
              </Card.Body>
            </Card>
          </div>
        );
      }
      if (row.flag === 2) {
        return (
          <div className="col-lg-6 col-md-6 col-12 centerall">
            <Card style={{ width: "22rem" }}>
              <Card.Body>
                <Card.Title className="show-20">
                  {row.treatment_name}
                </Card.Title>
                <Card.Text>Booked Date: {row.date}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <div className="bold">Hospital Name</div> {row.hospital_name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="bold">Hospital Email</div>{" "}
                  {row.hospital_email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="bold">Hospital No.</div> {row.hospital_phone}
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="bold">Hospital Address</div>{" "}
                  {row.hospital_address}
                </ListGroup.Item>
              </ListGroup>
              <Card.Body>
                Status :{" "}
                <button className="remove btn btn-danger show-23">
                  Rejected
                </button>
              </Card.Body>
            </Card>
          </div>
        );
      }
    });

  return (
    <div>
      <div className="show-1">
        <div className="show-2">
          <div className="show-4">
            <Link to="/user/home" className="show-5">
              Home
            </Link>{" "}
            / Show Appointment
          </div>
          <div className="show-3">Show Appointment</div>
        </div>
      </div>
      <div className="show-51">
        <div className="container roshan ">
          <div className="row centercards">
            <h2 className="heading">Appointments</h2>
            {kan}
            <div className="col-12 show-31">
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
    </div>
  );
};

export default ShowAppointment;
