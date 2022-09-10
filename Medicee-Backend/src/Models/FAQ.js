const mongoose = require('mongoose');

const FAQ = new mongoose.Schema({
    email: {
        type:String,
        required:true,
    },
    question: {
        type:String,
        required:true,
    },
    answer: {
        type:String,
        required:true,
    }
})


const FAQPart = mongoose.model('faq', FAQ);

module.exports = FAQPart;