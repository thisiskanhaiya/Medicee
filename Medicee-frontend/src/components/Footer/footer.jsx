import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";
import { FaMedrt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { contextAPi } from "../../App";
const Footer = () => {
  const { state, dispatch } = useContext(contextAPi);
  const RenderMenu = () => {
    if (state === "home") {
      return (
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold">Useful links</h6>
          <hr className="mb-4 mt-0 d-inline-block mx-auto stylethird" />
          <p>
            <Link to="/" className="links">
              Home
            </Link>
          </p>
          <p>
            <Link to="/services" className="links">
              Services
            </Link>
          </p>
          <p>
            <Link to="/contactus" className="links">
              Contact Us
            </Link>
          </p>
          <p>
            <Link to="/faq" className="links">
              FAQ
            </Link>
          </p>
        </div>
      );
    }
    if (state === "hospital") {
      return (
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold">Useful links</h6>
          <hr className="mb-4 mt-0 d-inline-block mx-auto stylethird" />
          <p>
            <Link to="/hospital/home" className="links">
              Home
            </Link>
          </p>
          {/* <p>
            <Link to="/hospital/services" className="links">
              Services
            </Link>
          </p> */}
          <p>
            <Link to="/hospital/contactus" className="links">
              Contact Us
            </Link>
          </p>
          <p>
            <Link to="/hospital/add_treatment" className="links">
            Add Treatment
            </Link>
          </p>
          <p>
            <Link to="/hospital/show_appointment" className="links">
            Show Appointment
            </Link>
          </p>
          {/* <p>
            <Link to="/hospital/faq" className="links">
              FAQ
            </Link>
          </p> */}
        </div>
      );
    }
    if (state === "user") {
      return (
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold">Useful links</h6>
          <hr className="mb-4 mt-0 d-inline-block mx-auto stylethird" />
          <p>
            <Link to="/user/home" className="links">
              Home
            </Link>
          </p>
          {/* <p>
            <Link to="/user/services" className="links">
              Services
            </Link>
          </p> */}
          <p>
            <Link to="/user/contactus" className="links">
              Contact Us
            </Link>
          </p>
          <p>
            <Link to="/user/add_appointment" className="links">
            Add Appointment
            </Link>
          </p>
          <p>
            <Link to="/user/show_appointment" className="links">
            Show Appointment
            </Link>
          </p>
          {/* <p>
            <Link to="/user/faq" className="links">
              FAQ
            </Link>
          </p> */}
        </div>
      );
    }
    if (state === "admin") {
      return (
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold">Useful links</h6>
          <hr className="mb-4 mt-0 d-inline-block mx-auto stylethird" />
          <p>
            <Link to="/admin/home" className="links">
              Home
            </Link>
          </p>
          {/* <p>
            <Link to="/admin/services" className="links">
              Services
            </Link>
          </p> */}
          <p>
            <Link to="/admin/faq" className="links">
              FAQ
            </Link>
          </p>
        </div>
      );
    }
  };

  return (
    <div className="complete">
      <footer className="container text-center text-lg-start text-dark stylefirst">
        <section className="d-flex justify-content-between text-white stylesecond"></section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">
                  <FaMedrt className="icon" /> Medicee
                </h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto stylethird" />
                <p>
                  We are technology driven online solution for all your medical
                  needs. Our team of medical experts will accompany you at every
                  step. From finding the right hospital booking
                  appointments,comparing procedure costs to solving your health
                  related queries.
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Service Provided</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto stylethird" />
                <p>Search Treatment Hospital</p>
                <p>Book Appointment</p>
                <p>Track Appointment</p>
                <p>Ask Query</p>
              </div>
              <RenderMenu />
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto stylethird" />
                <p>
                  <i className="fas fa-home mr-3"></i> New Delhi, NY 10012,
                  Dhanbad
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i> support@medicee.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> + 01 234 567 88
                </p>
                <p>
                  <i className="fas fa-print mr-3"></i> + 01 234 567 89
                </p>
              </div>
            </div>
          </div>
        </section>
      </footer>
      <div className="text-center p-3 stylefour">
        © 2020 Copyright: medicee.com
      </div>
    </div>
  );
};

export default Footer;
