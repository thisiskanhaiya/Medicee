import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./FAQ.css";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Pagination } from "@mui/material";

const FAQ = () => {
  // this is for storing are user data
  const [tabledata, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  //  activate on loading
  useEffect(() => {
    axios
      .get("/faq/data")
      .then((res) => {
        setData(res.data["data"]);
        setCount(Math.ceil(tabledata.length / 8));
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // storing are user data into table
  let table;
  if (tabledata) {
    table = tabledata
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row, index) => {
        return (
          <div className="col-lg-10 col-md-8 col-12">
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
    <div>
      <div className="faq-1">
        <div className="faq-2">
          <div className="faq-4">
            <Link to="/" className="faq-5">
              Home
            </Link>{" "}
            / FAQ
          </div>
          <div className="faq-3">FAQ</div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-7 mb-5 faq-12">
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
          <div className="faq-11 col-lg-5"></div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
