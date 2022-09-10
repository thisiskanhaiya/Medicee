const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerhospitalSchema = new mongoose.Schema({
    hospital_name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
    },
    license_number: {
        type:String,
        required:true,
    },
    phone: {
        type:String,
        required:true,
    },
    state: {
        type:String,
        required:true,
    },
    city: {
        type:String,
        required:true,
    },
    area: {
        type:String,
        required:true,
    },
    address: {
        type:String,
        required:true,
    },
    state_ranking: {
        type:String,
        required:true,
    },
    city_ranking: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        require:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    treatmentDepartment:[String],
    doctor:[String],
    flag:{
        type:Number,
        default:0
    }
})


// ----------------------bcrypt password and confirm password------------------/// 


registerhospitalSchema.pre('save',async function(next){
    
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
        this.cpassword=await bcrypt.hash(this.cpassword,12);

    }
    next();

});




registerhospitalSchema.methods.generateAuthtoken_hospital = async function (){
    try{
        
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        console.log(token)
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch (err){
        console.log(err);
    }
}

const hospital = mongoose.model('Registerhospital', registerhospitalSchema);

module.exports = hospital;