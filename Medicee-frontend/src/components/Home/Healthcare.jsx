import React from "react";
import "./Healthcare.css";
import one from "../../assets/1.jpg";
import two from "../../assets/2.jpg";
import partners from "../../assets/partners.png";
import three from "../../assets/3.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
function Healthcare() {
  return (
    <div className="health-1">
      <div className="container">
        <div className="row">
          <h1 className="col-12 health-2">Medicee is Healthcare, But in a Easier Way</h1>
          <div className="col-12 row mt-5 mb-5 health-3">
            <div className="col-lg-4 col-md-6 col-12">
              <img className="img-grid" src={one} alt="" />
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <img className="img-grid" src={two} alt="" />
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <img className="img-grid" src={three} alt="" />
            </div>
          </div>

          <div className="col-12 partnership mb-5 row ">
            <div className="col-lg-6 col-12 mb-5 health-4">
              <p>
                <h4>Medicee is for Health System</h4>
              </p>
              <div id="partners">Our Parthner</div>
            </div>

            <div className="col-lg-6 col-12 mt-5 mb-5 par health-4">
              <img src={partners} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Healthcare;
