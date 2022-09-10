const mongoose=require('mongoose');

const AppointmentSchema=new mongoose.Schema({
    hospital_name:{
        type:String,
        required:true
    },
    hospital_email:{
        type:String,
        required:true
    },
    hospital_phone:{
        type:String,
        required:true
    },
    hospital_address:{
        type:String,
        required:true
    },
    treatment_name:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    flag:{
        type:Number,
        default:0
    }
})

const Appointment=mongoose.model("appointments",AppointmentSchema);

module.exports=Appointment;