import React from "react";
import "./Count.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import first from "./1.png";
import { useState } from "react";
import { useEffect } from "react";
const Count = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);

  useEffect(() => {
    axios
      .get("/home/get/database")
      .then((response) => {
        setData(response.data["data"]);
        setData2(response.data["data2"])
        setData3(response.data["data3"])
        setData4(response.data["data4"])
      })
      .catch((err)=>{
        console.log(err)
      });

  }, []);

  return (
    <div className="count-1">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12 count-2 row">
            <div className="col-12 row count-8 mt-5">
              <h1>Medicee Portal For Linked People</h1>
              <p>
                We envision a healthcare ecosystem where people from around the
                world can quickly find credible and reliable answers to their
                medical problems along with easy access to the best healthcare
                experts to guide them towards a healthier, happier and more
                fulfilling life. We aim to be the first port of call for
                customers having healthcare related need, doubt, or query.
              </p>
            </div>
            <div className="col-12 row ">
                <div className="col-md-6 col-12 mt-3 mb-3 count-6">
                    <h1>
                        {data.length}+
                    </h1>
                    <h3>Enrolled User </h3>
                </div>
                <div className="col-md-6 col-12 mt-3 mb-3 count-6">
                    <h1>
                        {data2.length}+
                    </h1>
                    <h3>Registered Hospital</h3>
                </div>
                <div className="col-md-6 col-12 mt-3 mb-3 count-6">
                    <h1>
                        {data4.length}+
                    </h1>
                    <h3>Doctor Available</h3>
                </div>
                <div className="col-md-6 col-12 mt-3 mb-3 count-6">
                    <h1>
                        {data3.length}+
                    </h1>
                    <h3>Treatments</h3>
                </div>


            </div>
          </div>
          <div className="col-lg-6 col-12 count-2 mt-5 mb-5">
            <img src={first} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Count;
