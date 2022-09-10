import React from "react";
import "./AddTreatment.css";
import swal from "sweetalert";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import YupPassword from "yup-password";
import "yup-phone";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { Button, Pagination } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { contextAPi } from "../../../App";
import axios from "axios";

const AddTreatment = (user) => {
  const { state, dispatch } = useContext(contextAPi);
  const History = useNavigate();

  const [tabledata, setTable] = useState([]);
  const [tabledata2, setTable2] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [treatment, setTreatment] = useState([]);
  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  useEffect(() => {
    axios
      .get("/hospital/logged")
      .then((res) => {
        dispatch({ type: "hospital", payload: "hospital" });
      })
      .catch((err) => {
        History("/login_hospital");
      });

    const getTreatments = async () => {
      const treatmentResponse = await axios.get("/suggestion/treatments");
      setTreatment(treatmentResponse.data);
    };

    getTreatments();
  }, []);

  useEffect(() => {
    axios
      .get("/hospital/getTreatment")
      .then((res) => {
        setTable(res.data["data"][0]["treatmentDepartment"]);
        setTable2(res.data["data2"][0]["doctor"]);
        setCount(Math.ceil(tabledata.length / 3));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tabledata.length]);

  const [treatmentSuggestion, setTreatmentSuggestion] = useState([]);

  const validate = yup.object(
    {
      add_treatment: yup.string().required(),
      doctor: yup.string().required(),
    },
    []
  );

  const users = useFormik({
    initialValues: {
      add_treatment: "",
      doctor: "",
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      const { add_treatment, doctor } = values;
      const res = await fetch("/addtreatment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          add_treatment,
          doctor,
        }),
      });
      swal("Added", "Treatment Added Sucessfully", "success").then(
        (value) => {
          users.values.add_treatment = "";
          users.values.doctor = "";
          setTable([...tabledata, add_treatment]);
        }
      );
    },
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const handletreatment = (event) => {
    let treatment = event.target.id;
    let doctor = event.target.getAttribute("data-doctor");
    axios
      .post("/hospital/getTreatmentDelete", { treatment, doctor })
      .then((res) => {
        swal("Deleted", "Treatment Deleted Successfully", "success").then(
          (value) => {
            const deletedata = tabledata;
            const filterdata = deletedata.filter((item) => item !== treatment);
            setTable(filterdata);
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // [...tabledata].reverse() page * rowsPerPage, page * rowsPerPage + rowsPerPage
  let table;
  if (tabledata) {
    table = [...tabledata]
      .reverse()
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row, index) => {
        return (
          <StyledTableRow key={row}>
            <StyledTableCell align="center">{row}</StyledTableCell>
            <StyledTableCell align="center">
              {tabledata2[tabledata2.length - 1 - index]}
            </StyledTableCell>
            <StyledTableCell align="center">
              <Button
                onClick={handletreatment}
                id={row}
                data-doctor={tabledata2[tabledata2.length - 1 - index]}
                data-index={index}
                variant="contained"
              >
                Delete
              </Button>
            </StyledTableCell>
          </StyledTableRow>
        );
      });
  }

  const handleTreatmentSuggestion = (event) => {
    console.log(event.target.value);
    let text = event.target.value;
    let matches = [];
    if (text.length > 0) {
      matches = treatment.filter((treatmentt) => {
        const regex = new RegExp(`${text}`, "gi");
        return treatmentt.match(regex);
      });
    }
    console.log(matches);
    setTreatmentSuggestion(matches);
  };

  const setOption = (event) => {
    let val = event.target.textContent;
    users.values.add_treatment = val;
    setTreatmentSuggestion([]);
  };

  return (
    <div>
      <div className="treatment-1">
        <div className="treatment-2">
          <div className="treatment-4">
            <Link to="/hospital/home" className="treatment-5">
              Home
            </Link>{" "}
            / Add Appointment
          </div>
          <div className="treatment-3">Add Appointment</div>
        </div>
      </div>
      <div className="container registration-page">
        <div className="signup">
          <div className="container mt-5">
            <div className="signup-contents">
              <div className="new-content">
                <div className="signup-images">
                  <img
                    src="https://www.springboard.com/library/static/b9abcee302122ac688b0593a3b8d2db6/c1b63/10-09-how-is-data-science-used-in-healthcare.png"
                    alt=""
                  />
                </div>
                <div className="signup-form">
                  <h2 className="form-title mb-4 margin-top">Add Treatment</h2>
                  <form
                    className="register-form"
                    id="register-form"
                    onSubmit={users.handleSubmit}
                  >
                    {/* Add Treatment */}
                    <div className="form-group mb-2">
                      <label htmlFor="name">
                        <i className="zmdi zmdi-hospital material-icons-name"></i>
                      </label>
                      <input
                        type="text"
                        name="add_treatment"
                        autoComplete="off"
                        placeholder="Add Treatment"
                        onChange={users.handleChange}
                        value={users.values.add_treatment}
                        className="roshan"
                        onInput={handleTreatmentSuggestion}
                      />
                      {users.touched.add_treatment &&
                        users.errors.add_treatment && (
                          <p className="error-part">
                            {users.errors.add_treatment}
                          </p>
                        )}
                      <div className="options-container">
                        {treatmentSuggestion.map((treatment) => {
                          return (
                            <div
                              className="options giveborder"
                              onClick={setOption}
                            >
                              {treatment}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Doctor */}
                    <div className="form-group mb-2">
                      <label htmlFor="doctor">
                        <i className="zmdi zmdi-hospital material-icons-name"></i>
                      </label>
                      <input
                        type="text"
                        name="doctor"
                        autoComplete="off"
                        placeholder="Add Doctor"
                        onChange={users.handleChange}
                        value={users.values.doctor}
                        className="roshan"
                      />
                      {users.touched.doctor && users.errors.doctor && (
                        <p className="error-part">{users.errors.doctor}</p>
                      )}
                    </div>
                    <div className="form-group form-button">
                      <input
                        type="submit"
                        name="signup"
                        id="signup"
                        className="form-submit"
                        value="Add Treatment"
                      />
                    </div>
                  </form>
                </div>
              </div>
              <TableContainer component={Paper} className="tableedit">
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">
                        Treatment Name
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Doctor Name
                      </StyledTableCell>
                      <StyledTableCell align="center">Delete</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{table}</TableBody>
                </Table>
              </TableContainer>
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

export default AddTreatment;
