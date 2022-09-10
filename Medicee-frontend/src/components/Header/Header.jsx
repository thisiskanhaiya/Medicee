import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { FaMedrt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { contextAPi } from "../../App";
function CollapsibleExample() {
  const { state, dispatch } = useContext(contextAPi);
  const RenderMenu = () => {
    if (state === "home") {
      return (
        <Navbar collapseOnSelect expand="lg" className="color-nav">
          <Container>
            <Navbar.Brand>
              <Link to="/" className="link">
                <FaMedrt className="icon" /> Medicee
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link>
                  <Link to="/" className="links">
                    Home
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/services" className="links">
                    Services
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/contactus" className="links">
                    Contact Us
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/faq" className="links">
                    FAQ
                  </Link>
                </Nav.Link>
              </Nav>
              <Nav>
                <NavDropdown
                  title="Registration"
                  id="collasible-nav-dropdown"
                  className="links"
                >
                  <NavDropdown.Item>
                    <Link to="/registration_user" className="links">
                      Register User
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    <Link to="/registration_hospital" className="links">
                      Register Hospital
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Log In"
                  id="collasible-nav-dropdown"
                  className="links"
                >
                  <NavDropdown.Item>
                    <Link to="/login_user" className="links">
                      Log In User
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    <Link to="/login_hospital" className="links">
                      Log In Hospital
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
    if (state === "hospital") {
      return (
        <Navbar collapseOnSelect expand="lg" className="color-nav">
          <Container>
            <Navbar.Brand>
              <Link to="/hospital/home" className="link">
                <FaMedrt className="icon" /> Medicee
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link>
                  <Link to="/hospital/home" className="links">
                    Home
                  </Link>
                </Nav.Link>
                {/* <Nav.Link>
                  <Link to="/hospital/services" className="links">
                    Services
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/hospital/faq" className="links">
                    FAQ
                  </Link>
                </Nav.Link> */}

                <Nav.Link>
                  <Link to="/hospital/update_details" className="links">
                    Hospital
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/hospital/add_treatment" className="links">
                    Add Treatment
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/hospital/show_appointment" className="links">
                    Show Appointment
                  </Link>
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link>
                  <Link to="/hospital/contactus" className="links">
                    Contact Us
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/hospital/logout" className="links">
                    Logout
                  </Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
    if (state === "user") {
      return (
        <Navbar collapseOnSelect expand="lg" className="color-nav">
          <Container>
            <Navbar.Brand>
              <Link to="/user/home" className="link">
                <FaMedrt className="icon" /> Medicee
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link>
                  <Link to="/user/home" className="links">
                    Home
                  </Link>
                </Nav.Link>
                {/* <Nav.Link>
                  <Link to="/user/services" className="links">
                    Services
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/user/faq" className="links">
                    FAQ
                  </Link>
                </Nav.Link> */}
                <Nav.Link>
                  <Link to="/user/update_details" className="links">
                    Profile
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/user/add_appointment" className="links">
                    Add Appointment
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/user/show_appointment" className="links">
                    Show Appointment
                  </Link>
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link>
                  <Link to="/user/contactus" className="links">
                    Contact Us
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/user/logout" className="links">
                    Logout
                  </Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
    if (state === "admin") {
      return (
        <Navbar collapseOnSelect expand="lg" className="color-nav">
          <Container>
            <Navbar.Brand>
              <Link to="/admin/home" className="link">
                <FaMedrt className="icon" /> Medicee
              </Link>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link>
                  <Link to="/admin/home" className="links">
                    Home
                  </Link>
                </Nav.Link>
                {/* <Nav.Link>
                  <Link to="/admin/services" className="links">
                    Services
                  </Link>
                </Nav.Link> */}
                <NavDropdown
                  title="User"
                  id="collasible-nav-dropdown"
                  className="links"
                >
                  <NavDropdown.Item>
                    <Link to="/admin/user/add_user" className="links">
                      Add User
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    <Link to="/admin/user/show_user" className="links">
                      Show User
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Hospital"
                  id="collasible-nav-dropdown"
                  className="links"
                >
                  <NavDropdown.Item>
                    <Link to="/admin/hospital/add_hospital" className="links">
                      Add Hospital
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/admin/hospital/show_hospital" className="links">
                      Show Hospital
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      to="/admin/hospital/pending_hosspital"
                      className="links"
                    >
                      Pending Hospital
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link>
                  <Link to="/admin/hospital/show_appointment" className="links">
                    Show Appointment
                  </Link>
                </Nav.Link>
                <NavDropdown
                  title="FAQ"
                  id="collasible-nav-dropdown"
                  className="links"
                >
                  <NavDropdown.Item>
                    <Link to="/admin/asked_faq" className="links">
                      Asked Questions
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/admin/faq" className="links">
                      FAQ
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>

              <Nav>
                <Nav.Link>
                  <Link to="/admin/logout" className="links">
                    Logout
                  </Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
  };
  return <RenderMenu />;
}

export default CollapsibleExample;
