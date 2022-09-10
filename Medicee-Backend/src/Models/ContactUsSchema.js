const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const ContactUsSchema = new mongoose.Schema({
    fullname: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
    },
    contact: {
        type:Number,
        required:true,
    },
    address: {
        type:String,
        required:true,
    },
    query: {
        type:String,
        required:true,
    },
    // city: {
    //     type:String,
    //     required:true,
    // },
    // state_: {
    //     type:String,
    //     required:true
    // },
    // zip:{
    //     type:String,
    //     require:true
    // },
})


const Contact = mongoose.model('Contactform', ContactUsSchema);

module.exports = Contact;