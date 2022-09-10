import React from "react";
import "./Topspecialist.css";
import psychatrist from "../../assets/psychatrist.svg";
import eyecare from "../../assets/eyecare.svg";
import dermalogist from "../../assets/dermalogist.svg";
import dentist from "../../assets/dentist.svg";
import obgyn from "../../assets/obgyn.svg";
import primarycare from "../../assets/primarycare.svg";

function Topspecialist() {
  return (
    <div className="specialist">
      <h1> Top-searched specialties</h1>

      <div className="card_main">
        <div className="cards">
          <img src={psychatrist} alt="" />

          <a href="#">Psychiatrist</a>
        </div>
        <div className="cards">
          <img src={eyecare} alt="" />
          <a href="#">Eye Doctor</a>
        </div>
        <div className="cards">
          <img src={dermalogist} alt="" />
          <a href="#"> Dermatologist</a>
        </div>
        <div className="cards">
          <img src={primarycare} alt="" />
          <a href="#"> Primary Care</a>
        </div>
        <div className="cards">
          <img src={obgyn} alt="" />
          <a href="#">OB-GYN</a>
        </div>
        <div className="cards">
          <img src={dentist} alt="" />
          <a href="#">Dentist</a>
        </div>
      </div>
    </div>
  );
}

export default Topspecialist;
