import React from "react";
import "./Hpartner.css";
import target from "./target.png";
import "bootstrap/dist/css/bootstrap.min.css";
function Hpartner() {
  return (
    <div className="hamara-3">
      <div className="container hamara-1">
      <div className="row hamara-2">
        <div className="col-lg-6 col-12 mt-5 mb-5  hamara-5">
          <img src={target} alt=""  className=" hamara-6"/>
        </div>

        <div className="col-lg-6 col-12 mt-5 mb-5 hamara-5">
          <h1>Medicee - Aapka Health Partner</h1>
          <p className="mt-2">
            We are technology driven online solution for all your medical needs.
            Our team of medical experts will accompany you at every step. From
            finding the right doctor and hospital booking doctor
            appointments,comparing procedure costs to solving your health
            related queries.We strive to continuously improve and develop new
            services to empower and educate patients and their families. Medicee
            is here to ensure that the right healthcare decisions are made.
          </p>
        </div>
      </div>
    </div>

    </div>
    
  );
}

export default Hpartner;
