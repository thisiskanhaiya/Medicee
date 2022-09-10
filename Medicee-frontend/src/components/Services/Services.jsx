import React from "react";
import "./Services.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import covid_consultation from "../../assets/services/covid_consultation.svg";
import dermatologist from "../../assets/services/dermatologist.svg";
import ic_general_medicine from "../../assets/services/ic_general_medicine.svg";
import ic_paediatrics from "../../assets/services/ic_paediatrics.svg";
import one from "../../assets/services/1.jpg";
import two from "../../assets/services/2.jpg";
import three from "../../assets/services/3.webp";
import four from "../../assets/services/4.jpg";
import five from "../../assets/services/5.jpg";
import six from "../../assets/services/6.jpg";
import Carousel from "react-bootstrap/Carousel";
import first from './1.jpg';
import second from './2.jpg';
import third from './3.jpg';
import Hpartner from './Hpartner';
const Services = () => {
  const TopSpecialist = [
    {
      heading: "Covid Consultation",
      img: covid_consultation,
      tretment: "Treatment of covid-19",
      problem: "Cough, Fever, Breathnessless",
    },
    {
      heading: "Dermatologist",
      img: dermatologist,
      tretment: "Treatment of Skin",
      problem: "Pimple, Skin Disorder, Hair Loss",
    },
    {
      heading: "Otolaryngology",
      img: ic_general_medicine,
      tretment: "Treatment of ENT",
      problem: "Eyestrain, Nazal Pain, Allergies",
    },
    {
      heading: "Pediatrician",
      img: ic_paediatrics,
      tretment: "Treatment of Child",
      problem: "Physical, Mental and Behavioral Issues",
    },
  ];
  const OtherTreatmentData = [
    {
      heading: "Allergic and clinical Immunologist",
      img: one,
      tretment: "Manage Allergic and treat immunity",
      problem: "Recurring Infections, Immnunity deficiency",
    },
    {
      heading: "Gastroenterologist",
      img: two,
      tretment: "Care for Immunity System",
      problem: "Teatment for Digestive Organs",
    },
    {
      heading: "Dentist",
      img: three,
      tretment: "Care for Teeths",
      problem: "Teeth Infections, Gum bleeding, Cavities",
    },
    {
      heading: "Cardiologist",
      img: four,
      tretment: "For Heart Pateintd",
      problem: "Treatment of heart attack, Heart failure and Arrhythmia",
    },
    {
      heading: "Oncologist",
      img: five,
      tretment: "For Cancer Pateint",
      problem: "Treatment of cancer, administering chemotherapy",
    },
    {
      heading: "Neurologist",
      img: six,
      tretment: "Care for Nervous System",
      problem: "Treatment of Brain, Nerves and Spinal cord",
    },
  ];
  const TreatmentData = TopSpecialist.map((row, index) => {
    return (
      <div className="col-lg-3 col-md-6 col-12 mt-3 mb-3">
        <Card className="content-center">
          <Card.Img variant="top" src={row.img} className="sizeimage" />
          <Card.Body className="content-center-2">
            <Card.Title>{row.heading}</Card.Title>
            <Card.Text>{row.tretment}</Card.Text>
            <Card.Text>{row.problem}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  });
  const OtherTreatment = OtherTreatmentData.map((row, index) => {
    return (
      <div className="col-lg-4 col-md-6 col-12 mt-3 mb-3">
        <Card className="content-center">
          <Card.Img variant="top" src={row.img} className="sizeimage" />
          <Card.Body className="content-center-2">
            <Card.Title>{row.heading}</Card.Title>
            <Card.Text>{row.tretment}</Card.Text>
            <Card.Text>{row.problem}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  });
  return (
    <div>
      <Carousel fade className="service-10">
        <Carousel.Item className="service-1">
          <img
            className="d-block w-100 service-1"
            src={first}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 className="service-2">Good Health</h3>
            <p className="service-3">Happiness is nothing more than good health</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="service-1">
          <img
            className="d-block w-100 service-1"
            src={second}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3 className="service-2">Prevent Disease</h3>
            <p className="service-3">The aim of medicine is to prevent disease</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="service-1">
          <img
            className="d-block w-100 service-1"
            src={third}
            alt="Third slide"
          />

          <Carousel.Caption >
            <h3 className="service-2">Part Of Life Style</h3>
            <p className="service-3">
            To enjoy the glow of good health, you must exercise
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Hpartner />
      <div className="container service">
        <div className="row margin">
          <h2 className="col-12 mb-3">TOP SPECIALTIES</h2>
          {TreatmentData}
        </div>
        <div className="row margin">
          <h2 className="col-12 mb-3">OTHER SPECIALTIES</h2>
          {OtherTreatment}
        </div>
      </div>
    </div>
  );
};

export default Services;
