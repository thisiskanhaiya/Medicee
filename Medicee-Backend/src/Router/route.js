const express = require("express");
const router = express.Router();
var cors = require("cors");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sgMail = require("nodemailer");
const sweetalert = require("sweetalert");
const nodemailer = require("nodemailer");
const authenticate = require("../Middleware/Authenticate");
const authenticateuser = require("../Middleware/AuthenticateUser");

// -------- Database Connected --------------
require("../Database/Connection");
// --------Database Registration User Schema --------------
const user = require("../Models/RegistrationSchema");
// --------Database Registration Hospital Schema --------------
const RegiterHospital = require("../Models/RegistrationHospital");
// --------Database Contact Us Schema --------------
const contactus = require("../Models/ContactUsSchema");
// --------Database appointments schema -------------
const appointments = require("../Models/Appointments");
// -------- FAQ  schema ---------------------------
const faq = require("../Models/FAQ");

//  ------------------------------- registration user route ------------------------------------ //
router.post("/registration_user", async (req, res) => {
  const { name, email, phone, password, confirm_password } = req.body;
  if (!name || !email || !phone || !password || !confirm_password) {
    return res.status(421).json({ error: "All Field are required" });
  }

  try {
    const userExist = await user.findOne({ email: email }); //checking if user exists already

    if (userExist) {
      res.status(422).json({ error: "User already exist" });
    } else if (password !== confirm_password) {
      res.status(423).json({ error: "Passwords doesnot match correctly" });
    } else {
      const registered_user = new user({
        name,
        email,
        phone,
        password,
        cpassword: confirm_password,
      }); //make user object

      await registered_user.save(); // storing user in database

      var transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        secureConnection: false,
        auth: {
          user: "roshanprajapati678@gmail.com",
          pass: "qarphfxzpzznlbwf",
        },
      });

      var option = {
        from: "roshanprajapati678@gmail.com",
        to: email,
        subject: "Registration Successfull",
        html: `<div>
        <p>Dear ${name}</p>
        <p>Congratulations, your account has been successfully created.</p>
        <p>If you experience any issues logging into your account, reach out to us at support@medicee.com.</p>
        <p>Regards</p>
        <p><strong>Team Medicee</strong></p>
        </div>`,
      };

      transporter.sendMail(option, (err, info) => {
        if (err) {
          console.log("Error Occurs");
        } else {
          console.log("Email sent successfully");
        }
      });
      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//  ------------------------------- registration hospital route ------------------------------------ //
// write your code here

router.post("/registration_hospital", async (req, res) => {
  const {
    hospital_name,
    email,
    license_number,
    phone,
    password,
    confirm_password,
    state,
    city,
    area,
    address,
    state_ranking,
    city_ranking,
  } = req.body;

  if (
    !hospital_name ||
    !email ||
    !phone ||
    !password ||
    !confirm_password ||
    !license_number ||
    !state ||
    !city ||
    !state_ranking ||
    !city_ranking ||
    !address ||
    !area
  ) {
    return res.status(421).json({ error: "All Field are required" });
  }

  try {
    const hospitalExist = await RegiterHospital.findOne({ email: email });
    if (hospitalExist) {
      res.status(422).json({ error: "hospital already exists" });
    } else if (password !== confirm_password) {
      res.status(423).json({ error: "Passwords does not match" });
    } else {
      const registeredHospital = new RegiterHospital({
        hospital_name,
        email,
        license_number,
        phone,
        password,
        state,
        city,
        area,
        address,
        state_ranking,
        city_ranking,
        cpassword: confirm_password,
      });
      await registeredHospital.save();
      var transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        secureConnection: false,
        auth: {
          user: "roshanprajapati678@gmail.com",
          pass: "qarphfxzpzznlbwf",
        },
      });

      var option = {
        from: "roshanprajapati678@gmail.com",
        to: email,
        subject: "Registration Successfull",
        html: `<div>
        <p>Congratulations, ${hospital_name}</p>
        <p>Your account has been successfully created.</p>
        <p>If you experience any issues logging into your account, reach out to us at support@medicee.com.</p>
        <p>Regards</p>
        <p><strong>Team Medicee</strong></p>
        </div>`,
      };

      transporter.sendMail(option, (err, info) => {
        if (err) {
          console.log("Error Occurs");
        } else {
          console.log("Email sent successfully");
        }
      });
      res.status(201).json({ message: "Hospital registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//  ------------------------------- contact us route ------------------------------------ //
router.post("/contactus", async (req, res) => {
  const { fullname, email, contact, address, query } = req.body;

  if (!fullname || !email || !contact || !address || !query) {
    return res.status(421).json({ error: "All Field are required" });
  }
  try {
    const contact_data = new contactus({
      fullname,
      email,
      contact,
      address,
      query,
    });
    await contact_data.save();
    res.status(201).json({ message: "user registered successfully" });
  } catch (err) {
    console.log(err);
  }
});

//  ------------------------------- Login user route ------------------------------------ //

router.post("/login_user", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Plz Filled the data" });
    }
    const userLogin = await user.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      // flag-1  (need to check)

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credential" });
      } else {
        token = await userLogin.generateAuthtoken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 5184000),
          httpOnly: true,
        });
        res.json({ message: "user signin successfully" });
      }
    } else {
      res.status(404).json({ error: "Invalid Credential" });
    }
  } catch (err) {
    console.log(err);
  }
});

//  ------------------------------- Login hospital route ------------------------------------ //

router.post("/login_hospital", async (req, res) => {
  try {
    let token_hospital;
    const { email, password } = req.body;

    if (email === "" || password === "") {
      res.status(400).json({ error: "Plz Filled the data" });
    }
    const hospitalLogin = await RegiterHospital.findOne({ email: email });
    if (hospitalLogin) {
      const isMatch = await bcrypt.compare(password, hospitalLogin.password);
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credential" });
      } else {
        if (hospitalLogin.flag == 0) {
          res.status(402).json({ message: "Pending for approval" });
        } else if (hospitalLogin.flag == 2) {
          res.status(403).json({ message: "Hospital Rejected" });
        } else {
          token_hospital = await hospitalLogin.generateAuthtoken_hospital();

          res.cookie("jwtoken_hospital", token_hospital, {
            expires: new Date(Date.now() + 5184000),
            httpOnly: true,
          });
          res.json({ message: "Hospital signin successfully" });
        }
      }
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

//  ------------------------------- hospital details route ------------------------------------ //

router.get("/hospital/update_details", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.put("/hospital/update_details", async (req, res) => {
  const {
    hospital_name,
    email,
    phone,
    license_number,
    state,
    city,
    area,
    address,
    state_ranking,
    city_ranking,
  } = req.body;
  if (
    !hospital_name ||
    !phone ||
    !license_number ||
    !state ||
    !city ||
    !state_ranking ||
    !city_ranking ||
    !address ||
    !area
  ) {
    return res.status(421).json({ error: "All Field are required" });
  }
  try {
    await RegiterHospital.updateOne(
      { email: email },
      {
        hospital_name,
        phone,
        state,
        city,
        area,
        address,
        license_number,
        state_ranking,
        city_ranking,
      }
    );
    res.status(201).json("Document updtaed successfully");
  } catch (err) {
    console.log(err);
  }
});

//  ------------------------------- user details  route ------------------------------------ //
router.get("/user/update_details", authenticateuser, (req, res) => {
  res.send(req.rootUser);
});
router.put("/user/update_details", async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !phone) {
    return res.status(421).json({ error: "All Field are required" });
  }
  try {
    await user.updateOne({ email: email }, { name, phone, email });
    res.status(201).json("Document updtaed successfully");
  } catch (err) {
    console.log(err);
  }
});

//  ------------------------------- user details  route ------------------------------------ //
router.get("/user/add_appointment", authenticateuser, (req, res) => {
  res.send(req.rootUser);
});

//  ------------------------------- logout hospital route ------------------------------------ //

router.get("/hospital/logout", (req, res) => {
  res.clearCookie("jwtoken_hospital", { path: "/" });
  res.status(200).json({ message: "logged out succesfully" });
});

//  ------------------------------- logout user route ------------------------------------ //

router.get("/user/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).json({ message: "logged out succesfully" });
});

// <------------------------- route to get states name from db ---------------------->

router.get("/getstates", async (req, res) => {
  const states = await RegiterHospital.distinct("state");
  res.json({ states: states });
});

// <-------------------------- route to check user login ------------------>

router.get("/checkuserlogin", authenticateuser, async (req, res) => {
  res.send(req.rootUser);
});

// <------------------------- route to get cities name from db ---------------------->
router.post("/getcities", async (req, res) => {
  const state = req.body;
  let statevalue;
  for (var key in state) {
    statevalue = key;
  }
  const cities = await RegiterHospital.distinct("city", { state: statevalue });
  res.json({ cities: cities });
});

// <------------------------- route to get areas name from db ---------------------->
router.post("/getareas", async (req, res) => {
  const city = req.body;
  let cityvalue;
  for (var keys in city) {
    cityvalue = keys;
  }
  const areas = await RegiterHospital.distinct("area", { city: cityvalue });
  res.json({ areas: areas });
});

// <------------------------- route to get areas name from db ---------------------->
router.post("/gettreatment", async (req, res) => {
  const area = req.body;
  let areavalue;
  for (var keys in area) {
    areavalue = keys;
  }
  const treatmentDepartment = await RegiterHospital.distinct(
    "treatmentDepartment",
    { area: areavalue }
  );
  res.json({ treatmentDepartment: treatmentDepartment });
});

// <------------------------- route to get hospital data from db ---------------------->
router.post("/getdata", async (req, res) => {
  const { state, city, area, treatment } = req.body;
  const result = await RegiterHospital.find({
    state: state,
    city: city,
    area: area,
    treatmentDepartment: treatment,
  }).select({
    hospital_name: 1,
    email: 1,
    state_ranking: 1,
    city_ranking: 1,
    phone: 1,
    address: 1,
    treatmentDepartment: 1,
    doctor: 1
  }).sort({city_ranking: 1});
  if (!result) {
    res.status(400).json({ error: "Invalid Credential" });
  } else {
    res.status(200).json({ result: result });
  }
});

// <------------------------- route to get hospital data from db ---------------------->
router.post("/getdata/get", async (req, res) => {
  const { state, city, area, treatment } = req.body;
  const result = await RegiterHospital.find({
    state: state,
    city: city,
    area: area,
    treatmentDepartment: treatment,
  }).select({
    hospital_name: 1,
    email: 1,
    state_ranking: 1,
    city_ranking: 1,
    phone: 1,
    address: 1,
    treatmentDepartment: 1,
    doctor: 1
  }).sort({city_ranking: 1}).limit(3)
  if (!result) {
    res.status(400).json({ error: "Invalid Credential" });
  } else {
    res.status(200).json({ result: result });
  }
});

// <------------------------- route to post user register hospital data to db ---------------------->
router.post("/user/add_appointment", async (req, res) => {
  const {
    hospital_name,
    hospital_email,
    hospital_phone,
    hospital_address,
    treatment_name,
    name,
    email,
    phone,
    date,
  } = req.body;
  if (
    !hospital_name ||
    !hospital_email ||
    !hospital_phone ||
    !hospital_address ||
    !treatment_name ||
    !name ||
    !email ||
    !phone ||
    !date
  ) {
    return res.status(421).json({ error: "All Field are required" });
  }
  try {
    const userExist = await appointments.findOne({
      hospital_name: hospital_name,
      email: email,
      date: date,
    });
    if (userExist) {
      res.status(422).json({ error: "Already booked for same date" });
    } else {
      const appointmentbook = new appointments({
        hospital_name,
        hospital_email,
        hospital_phone,
        hospital_address,
        treatment_name,
        name,
        email,
        phone,
        date,
      });
      await appointmentbook.save();
      var transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        secureConnection: false,
        auth: {
          user: "roshanprajapati678@gmail.com",
          pass: "qarphfxzpzznlbwf",
        },
      });

      var option = {
        from: "roshanprajapati678@gmail.com",
        to: email,
        subject: "Appointment Booked Successfull",
        html: `<div>
        <p>Dear ${name}</p>
        <p>Congratulations, your appointment has been successfully booked.</p>
        <ul>
          <li>Hospital Name: ${hospital_name}</li>
          <li>Hospital Email: ${hospital_email}</li>
          <li>Hospital Phone: ${hospital_phone}</li>
          <li>Hospital Address: ${hospital_address}</li>
          <li>Treatment Name: ${treatment_name}</li>
          <li>Date: ${date}</li>
        </ul>
        <p>If you experience any issues booking your appointment, reach out to us at support@medicee.com.</p>
        <p>Regards</p>
        <p><strong>Team Medicee</strong></p>
        </div>`,
      };

      transporter.sendMail(option, (err, info) => {
        if (err) {
          console.log("Error Occurs");
        } else {
          console.log("Email sent successfully");
        }
      });
      res.status(201).json({ message: "booked successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

// <-------------------------- get current logged user --------------------->

router.get("/user/logged", authenticateuser, (req, res) => {
  res.json({ user: req.rootUser });
});

// <-------------------------- get current logged hospital --------------------->
router.get("/hospital/logged", authenticate, (req, res) => {
  res.json({ hospital: req.rootUser });
});

// <-------------------------- get current user appointment--------------------->

router.post("/user/findappointment", async (req, res) => {
  const { user_email } = req.body;
  const result = await appointments.find({ email: user_email });
  res.status(201).json({ data: result });
});

// <--------------------------show appointment to hospital route--------------------->

router.post("/hospital/findappointment", async (req, res) => {
  const { hospital_email } = req.body;
  const result = await appointments.find({ hospital_email: hospital_email, flag:0 });
  res.status(201).json({ data: result });
});

// <--------------------------show appointment 2 to hospital route--------------------->

router.post("/hospital/findapproved", async (req, res) => {
  const { hospital_email } = req.body;
  const result = await appointments.find({ hospital_email: hospital_email, flag:1 });
  res.status(201).json({ data: result });
});

//--------------------------------show all appointments---------------------->

router.post("/admin/hospital/findappointment", async (req, res) => {
  // const { hospital_email } = req.body;
  const result = await appointments.find({flag:1});
  res.status(201).json({ data: result });
});

// <-------------------------- delete appointment route --------------------->
router.post("/user/deleteAppointment", async (req, res) => {
  const {
    hospital_name,
    hospital_email,
    hospital_address,
    hospital_phone,
    treatment_name,
    date,
  } = req.body;
  await appointments.deleteOne({
    hospital_name,
    hospital_email,
    hospital_address,
    hospital_phone,
    treatment_name,
    date,
  });
  res.status(201).json({ message: "Deleted Successfully" });
});
// <-------------------------- deleting user from admin login -------------------------->
router.post("/user/deleteuser", async (req, res) => {
  const { email } = req.body;
  await user.deleteOne({ email });
  res.status(201).json({ message: "Deleted Successfully" });
});

// <-------------------------- deleting Hospital from admin login -------------------------->
router.post("/admin/deletehospital", async (req, res) => {
  const { email } = req.body;
  await RegiterHospital.deleteOne({ email });
  res.status(201).json({ message: "Deleted Successfully" });
});

// <-------------------------- get current hospital used by user appointment--------------------->

router.post("/user/findhospital", async (req, res) => {
  const ros = req.body;
  const result = await RegiterHospital.find({ email: ros.hospital_email });
  console.log(result);
  // res.status(201).json({ data: result});
});

// <------------------------------ add treatment route ----------------------->

router.post("/addtreatment", authenticate, async (req, res) => {
  const { add_treatment, doctor } = req.body;
  let hospital = req.rootUser;
  try {
    console.log(hospital);
    await RegiterHospital.updateMany(
      { email: hospital["email"] },
      { $push: { treatmentDepartment: add_treatment } }
    );
    await RegiterHospital.updateMany(
      { email: hospital["email"] },
      { $push: { doctor: doctor } }
    );
    res.json({ message: "Treatment added successfully" });
  } catch (err) {
    console.log(err);
  }
});

// <------------------------------ get hospital treatment route ----------------------->
router.get("/hospital/getTreatment", authenticate, async (req, res) => {
  let hospital = req.rootUser;
  try {
    const result = await RegiterHospital.find(
      { email: hospital["email"] },
      { treatmentDepartment: 1 }
    );
    const result2 = await RegiterHospital.find(
      { email: hospital["email"] },
      { doctor: 1 }
    );
    res.json({ data: result, data2: result2 });
  } catch (err) {
    console.log(err);
  }
});

// <------------------------------ delete hospital treatment route ----------------------->
router.post("/hospital/getTreatmentDelete", authenticate, async (req, res) => {
  const { treatment, doctor } = req.body;
  let hospital = req.rootUser;
  try {
    const result = await RegiterHospital.updateMany(
      { email: hospital["email"] },
      { $pull: { treatmentDepartment: treatment } }
    );
    const result2 = await RegiterHospital.updateMany(
      { email: hospital["email"] },
      { $pull: { doctor: doctor } }
    );
    res.json({ message: "deleted successfully" });
  } catch (err) {
    console.log(err);
  }
});

// <----------------------------- Accept Flag Change Route ---------------------------->

router.post("/hospital/flagAccept", async (req, res) => {
  const {
    hospital_name,
    hospital_email,
    hospital_phone,
    hospital_address,
    name,
    date,
    treatment_name,
    email,
    phone,
  } = req.body;
  try {
    await appointments.updateOne(
      { name, date, treatment_name, email, phone },
      { $set: { flag: 1 } }
    );
    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      secureConnection: false,
      auth: {
        user: "roshanprajapati678@gmail.com",
        pass: "qarphfxzpzznlbwf",
      },
    });

    var option = {
      from: "roshanprajapati678@gmail.com",
      to: email,
      subject: "Approved Appointment",
      html: `<div>
      <p>Dear ${name}</p>
      <p>Congratulations, your appointment has been approved by ${hospital_name}.</p>
      <ul>
        <li>Hospital Name: ${hospital_name}</li>
        <li>Hospital Email: ${hospital_email}</li>
        <li>Hospital Phone: ${hospital_phone}</li>
        <li>Hospital Address: ${hospital_address}</li>
        <li>Treatment Name: ${treatment_name}</li>
        <li>Date: ${date}</li>
      </ul>
      <p>If you experience any issues, reach out to us at support@medicee.com.</p>
      <p>Regards</p>
      <p><strong>Team Medicee</strong></p>
      </div>`,
    };

    transporter.sendMail(option, (err, info) => {
      if (err) {
        console.log("Error Occurs");
      } else {
        console.log("Email sent successfully");
      }
    });
    res.status(201).json({ message: "Flag Changed Successfully" });
  } catch (err) {
    console.log(err);
  }
});

// <-------------------------- get all users for admin --------------------->

router.get("/admin/user/getdatauser", authenticateuser, async (req, res) => {
  try {
    const result = await user.find();
    res.status(201).json({ data: result });
  } catch (err) {
    console.log(err);
  }
});

// <-------------------------- get all Hospitals for admin --------------------->

router.get("/admin/hospital/getdatahospital", async (req, res) => {
  try {
    const result = await RegiterHospital.find();
    res.status(201).json({ data: result });
  } catch (err) {
    console.log(err);
  }
});

// <--------------------------- Reject Flag Change Route --------------------->

router.post("/hospital/flagReject", async (req, res) => {
  const {
    hospital_name,
    hospital_email,
    hospital_phone,
    hospital_address,
    name,
    date,
    treatment_name,
    email,
    phone,
  } = req.body;
  try {
    await appointments.updateOne(
      { name, date, treatment_name, email, phone },
      { $set: { flag: 2 } }
    );
    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      secureConnection: false,
      auth: {
        user: "roshanprajapati678@gmail.com",
        pass: "qarphfxzpzznlbwf",
      },
    });

    var option = {
      from: "roshanprajapati678@gmail.com",
      to: email,
      subject: "Reject Appointment",
      html: `<div>
      <p>Dear ${name}</p>
      <p>Sorry, your appointment has been reject by the ${hospital_name}.</p>
      <ul>
        <li>Hospital Name: ${hospital_name}</li>
        <li>Hospital Email: ${hospital_email}</li>
        <li>Hospital Phone: ${hospital_phone}</li>
        <li>Hospital Address: ${hospital_address}</li>
        <li>Treatment Name: ${treatment_name}</li>
        <li>Date: ${date}</li>
      </ul>
      <p>If you experience any issues, reach out to us at support@medicee.com.</p>
      <p>Regards</p>
      <p><strong>Team Medicee</strong></p>
      </div>`,
    };

    transporter.sendMail(option, (err, info) => {
      if (err) {
        console.log("Error Occurs");
      } else {
        console.log("Email sent successfully");
      }
    });
    res.status(201).json({ message: "Flag Changed Successfully" });
  } catch (err) {
    console.log(err);
  }
});

// <--------------------------- find hospital data those who pending for approval --------------------->

router.get("/admin/hospital/gethospitalpendingdata", async (req, res) => {
  try {
    const result = await RegiterHospital.find({ flag: 0 });
    res.status(201).json({ data: result });
  } catch (err) {
    console.log(err);
  }
});

// <--------------------------- find CONTACT US data --------------------->
router.get("/admin/faq/finddata", async (req, res) => {
  try {
    const result = await contactus.find();
    res.status(201).json({ data: result });
  } catch (err) {
    console.log(err);
  }
});

// <--------------------------- admin hospital deleted --------------------->

router.post("/admin/hospital/deletehospitaldata", async (req, res) => {
  const { email } = req.body;
  try {
    await RegiterHospital.deleteOne({ email });
    res.status(201).json({ message: "deleted data from the hospital" });
  } catch (err) {
    console.log(err);
  }
});

// <--------------------------- update hospital status rejected --------------------->

router.put("/admin/hospital/hospitalrejeted", async (req, res) => {
  const { email, answer, flag } = req.body;
  try {
    const result = await RegiterHospital.updateOne(
      { email },
      { $set: { flag: flag } }
    );
    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      secureConnection: false,
      auth: {
        user: "roshanprajapati678@gmail.com",
        pass: "qarphfxzpzznlbwf",
      },
    });

    var option = {
      from: "roshanprajapati678@gmail.com",
      to: email,
      subject: "Hospital Rejected",
      html: `<div>
        <p>Hospital registration application rejected.</p>
        <p>Check the rejected reason and register again.</p>
        <p><strong>Reason:</strong> ${answer}</p>
        <p>If you experience any issues, reach out to us at support@medicee.com.</p>
        <p>Regards</p>
        <p><strong>Team Medicee</strong></p>
        </div>`,
    };

    transporter.sendMail(option, (err, info) => {
      if (err) {
        console.log("Error Occurs");
      } else {
        console.log("Email sent successfully");
      }
    });
    res.status(201).json({ meessage: "updated successfully" });
  } catch (err) {
    console.log(err);
  }
});

router.put("/admin/hospital/hospitalaccepted", async (req, res) => {
  const { email, flag } = req.body;
  try {
    const result = await RegiterHospital.updateOne(
      { email },
      { $set: { flag: flag } }
    );
    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      secureConnection: false,
      auth: {
        user: "roshanprajapati678@gmail.com",
        pass: "qarphfxzpzznlbwf",
      },
    });

    var option = {
      from: "roshanprajapati678@gmail.com",
      to: email,
      subject: "Hospital Approved",
      html: `<div>
        <p>Greeting of the day!!</p>
        <p>Thank you for registering your hospital in our medicee website.</p>
        <p>Now you are eligible to login and add treatment.</p>
        <p>If you experience any issues, reach out to us at support@medicee.com.</p>
        <p>Regards</p>
        <p><strong>Team Medicee</strong></p>
        </div>`,
    };

    transporter.sendMail(option, (err, info) => {
      if (err) {
        console.log("Error Occurs");
      } else {
        console.log("Email sent successfully");
      }
    });
    res.status(201).json({ meessage: "updated successfully" });
  } catch (err) {
    console.log(err);
  }
});

// <-------------------------- admin save answer in faq schema --------------------------->
router.post("/hospital/admin/answer", async (req, res) => {
  const { email, question, answer } = req.body;
  try {
    const faqanswer = new faq({ email, question, answer });
    await faqanswer.save();
    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      secureConnection: false,
      auth: {
        user: "roshanprajapati678@gmail.com",
        pass: "qarphfxzpzznlbwf",
      },
    });

    var option = {
      from: "roshanprajapati678@gmail.com",
      to: email,
      subject: "Reply Answer",
      html: `<div>
      <p>Greeting of the day!!</p>
      <p>Thank you for your valuable question.</p>
      <p><strong>Question:</strong> ${question}</p>
      <p><strong>Answer:</strong> ${answer}</p>
      <p>If you experience any issues, reach out to us at support@medicee.com.</p>
      <p>Regards</p>
      <p><strong>Team Medicee</strong></p>
      </div>`,
    };

    transporter.sendMail(option, (err, info) => {
      if (err) {
        console.log("Error Occurs");
      } else {
        console.log("Email sent successfully");
      }
    });
    res.status(201).json({ message: "Set answer for asked question" });
  } catch (err) {
    console.log(err);
  }
});

// <-------------------------- admin save answer in faq schema --------------------------->
router.post("/hospital/admin/answerno", async (req, res) => {
  const { email, question, answer } = req.body;
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      secureConnection: false,
      auth: {
        user: "roshanprajapati678@gmail.com",
        pass: "qarphfxzpzznlbwf",
      },
    });

    var option = {
      from: "roshanprajapati678@gmail.com",
      to: email,
      subject: "Reply Answer",
      html: `<div>
      <p>Greeting of the day!!</p>
      <p>Thank you for your valuable question.</p>
      <p><strong>Question</strong> ${question}</p>
      <p><strong>Answer</strong> ${answer}</p>
      <p>If you experience any issues, reach out to us at support@medicee.com.</p>
      <p>Regards</p>
      <p><strong>Team Medicee</strong></p>
      </div>`,
    };

    transporter.sendMail(option, (err, info) => {
      if (err) {
        console.log("Error Occurs");
      } else {
        console.log("Email sent successfully");
      }
    });
    res.status(201).json({ message: "Set answer for asked question" });
  } catch (err) {
    console.log(err);
  }
});

// <-------------------------- delete data from contact us page --------------------------->
router.post("/admin/contact/delete", async (req, res) => {
  const { email, question, answer } = req.body;
  try {
    await contactus.deleteOne({ email, question });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      secureConnection: false,
      auth: {
        user: "roshanprajapati678@gmail.com",
        pass: "qarphfxzpzznlbwf",
      },
    });

    var option = {
      from: "roshanprajapati678@gmail.com",
      to: email,
      subject: "Reply Answer",
      html: `<div>
      <p>Greeting of the day!!</p>
      <p>Question: ${question}</p>
      <p>Answer: ${answer}</p>
      <p>If you experience any issues, reach out to us at support@medicee.com.</p>
      <p>Regards</p>
      <p><strong>Team Medicee</strong></p>
      </div>`,
    };

    transporter.sendMail(option, (err, info) => {
      if (err) {
        console.log("Error Occurs");
      } else {
        console.log("Email sent successfully");
      }
    });
    res.status(201).json({ message: "deleted data from contact us page" });
  } catch (err) {
    console.log(err);
  }
});

// <--------------------------- find faq data --------------------->
router.get("/faq/data", async (req, res) => {
  try {
    const result = await faq.find();
    res.status(201).json({ data: result });
  } catch (err) {
    console.log(err);
  }
});

// <--------------------------- suggestions route ------------------>

router.get("/suggestion/states", async (req, res) => {
  const states = await RegiterHospital.distinct("state");
  res.send(states);
});

router.get("/suggestion/city", async (req, res) => {
  const cities = await RegiterHospital.distinct("city");
  res.send(cities);
});

router.get("/suggestion/areas", async (req, res) => {
  const areas = await RegiterHospital.distinct("area");
  res.send(areas);
});

// <---------------------------- treatment suggestion route ------------>

router.get("/suggestion/treatments", async (req, res) => {
  const treatments = await RegiterHospital.distinct("treatmentDepartment");
  res.send(treatments);
});

// <---------------------------- get all user route ------------>

router.get("/home/get/database", async (req, res) => {
  const users = await user.distinct("email");
  const hospitals = await RegiterHospital.distinct("email");
  const treatments = await RegiterHospital.distinct("treatmentDepartment");
  const doctors = await RegiterHospital.distinct("doctor");
  res.send({data:users, data2:hospitals,data3: treatments, data4:doctors});
});


//  <------------------remove any fields ----------------------------------->
// router.put('/updateall/my',async (req,res)=>{
//   await RegiterHospital.updateMany({ },{ $unset: { treatmentDepartment: "" } })
//   res.send("ok");
// })
//  <------------------add any fields ----------------------------------->
// router.put("/updateAll", async (req, res) => {
//   // await RegiterHospital.updateMany({}, { $set: { flag: "1" } });
//   await RegiterHospital.updateMany({},{$push: { treatmentDepartment:'Plastic & Reconstructive Treatment'}});
//   await RegiterHospital.updateMany({},{$push: { doctor:'Dr. Mangal Pal'}});
  
//   // RegiterHospital.treatments.concat({
//   //   treatmentDepartment: "Hair Treatment",
//   // });
//   // await RegiterHospital.updateMany({},{$push:{'doctors':[{'doctor':'Dr. S.K.Rai'}]}});
//   // await RegiterHospital.doctors.concat({
//   //   doctor: "Dr. S.K.Rai",
//   // });
//   res.send("Updated");
// });

module.exports = router;
