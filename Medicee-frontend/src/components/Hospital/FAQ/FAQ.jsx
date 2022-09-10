import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./FAQ.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Pagination } from "@mui/material";
import { useContext } from "react";
import { contextAPi } from "../../../App";
import { useNavigate } from "react-router-dom";
const FAQ = () => {
  const History = useNavigate();
  const { state, dispatch } = useContext(contextAPi);
  // this is for storing are user data
  const [tabledata, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  //  activate on loading
  useEffect(() => {
    axios
      .get("/hospital/logged")
      .then((res) => {
        dispatch({ type: "hospital", payload: "hospital" });
        axios
          .get("/faq/data")
          .then((res) => {
            setData(res.data["data"]);
            setCount(Math.ceil(tabledata.length / 8));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        History("/login_hospital");
      });
  });

  // storing are user data into table
  let table;
  if (tabledata) {
    table = tabledata
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row, index) => {
        return (
          <div className="col-lg-8 col-md-10 col-12">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{row.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="typography">{row.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      });
  }

  return (
    <div className="container mt-5 mb-5 ">
      <h2 className="heading">Freaquently Asked Questions</h2>
      <div className="row aligncenters">
        {table}
        <div className="col-8 paginationpickcenter">
          <Pagination
            count={count}
            color="primary"
            onChange={(event, value) => setPage(value - 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default FAQ;
