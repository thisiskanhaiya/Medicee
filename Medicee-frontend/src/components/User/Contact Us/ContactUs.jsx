import "./ContactUs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Button, Form, Card, Collapse } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import "yup-phone";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { contextAPi } from "../../../App";
import axios from "axios";
export default function ContactUs() {
  const History = useNavigate();
  const { state, dispatch } = useContext(contextAPi);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    axios
      .get("/checkuserlogin")
      .then((res) => {
        dispatch({ type: "user", payload: "user" });
      })
      .catch((err) => {
        History('/login_user');
      });
  }, []);

  const validate = yup.object({
    fullname: yup.string().min(2).required(),
    email: yup.string().email().required(),
    contact: yup.string().phone().required(),
    address: yup.string().min(2).required(),
    query: yup.string().min(2).required()
  });

  const user = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      contact: "",
      address: "",
      query: ""
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      const { fullname, email, contact, address, query } =
        values;
      const res = await fetch("/contactus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          contact,
          address,
          query
        }),
      });

      const data = await res.json();

      // server side validation
      if (res.status === 421 || !data) {
        swal("Error", "All field are required", "warning");
      } else {
        swal("Send", "Your message sent successfully!", "success").then(
          (value) => {
            History("/admin/home");
          }
        );
      }
    },
  });


  return (
    
    <div>
      <div className="contact-1">
        <div className="contact-2">
          <div className="contact-4">
                  <Link to="/user/home" className="contact-5">
                    Home
                  </Link> / Contact Us
          </div>
          <div className="contact-3">
            Contact Us
          </div>
        </div>
      </div>
      <div className="container">
        <div className="design d-flex justify-content-center mt-1">
          <Form method="POST" onSubmit={user.handleSubmit} className="takewidth">
            <h2 className="send">Send Your Message</h2>
            <Form.Group className="mb-3" controlId="formGridName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="fullname"
                value={user.values.fullname}
                onChange={user.handleChange}
                placeholder="Place Your Full Name Here"
              />
              {user.touched.fullname && user.errors.fullname && (
                <p className="error-part">{user.errors.fullname}</p>
              )}
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  value={user.values.email}
                  onChange={user.handleChange}
                  type="email"
                  placeholder="Enter email"
                />
                {user.touched.email && user.errors.email && (
                  <p className="error-part">{user.errors.email}</p>
                )}
              </Form.Group>

              <Form.Group as={Col} controlId="Contact">
                <Form.Label>Contact No</Form.Label>
                <Form.Control
                  name="contact"
                  value={user.values.contact}
                  onChange={user.handleChange}
                  placeholder="Contact"
                />
                {user.touched.contact && user.errors.contact && (
                  <p className="error-part">{user.errors.contact}</p>
                )}
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                value={user.values.address}
                onChange={user.handleChange}
                placeholder="Place Your Address Here"
              />
              {user.touched.address && user.errors.address && (
                <p className="error-part">{user.errors.address}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridtext">
              <Form.Label>Your query</Form.Label>
              <Form.Control
                name="query"
                value={user.values.query}
                onChange={user.handleChange}
                placeholder="Your Query"
              />
              {user.touched.query && user.errors.query && (
                <p className="error-part">{user.errors.query}</p>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <br /> <br />
            <div>
              <Button
                className="btn btn-danger"
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
              >
                Click Here for Emergency
              </Button>
              <div style={{ minHeight: "50px" }}>
                <Collapse in={open} dimension="width">
                  <div className="mt-2" id="example-collapse-text">
                    <Card
                      body
                      style={{ width: "39vw" }}
                      className="card-emergency"
                    >
                      If you have any emergency then you should contact
                      "72XXXX7824" on this number immediately or go to the
                      emergency ward.
                    </Card>
                  </div>
                </Collapse>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <div className="contact-8">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28852.152947816765!2d82.97763527910153!3d25.320355800000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2e17903ec539%3A0x3013673951c589a!2sMedwin%20Multi%20Speciality%20Hospital%20-%20the%20best%20Hospital%20in%20Varanasi!5e0!3m2!1sen!2sin!4v1659536823546!5m2!1sen!2sin" 
        className="contact-9" allowfullscreen="" loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"></iframe>

      </div>
        
    </div>
  );
}
