const mongoose = require('mongoose');
const validator = require('validator');


const custSchema = mongoose.Schema({
    name:{
        type: String,
        minLength:5,
        required: true
    },
    m_no:{
        type:Number,
        required: true,
        min: 10
    },
    email:{
        type: String, 
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email');
            }
        }
    },
    messages:{
        type: String,
        required: true,
        minLength:3
    },
    date:{
        type : Date,
        default: new Date
    }

})
// we need to create a collection  
const Customer = mongoose.model('Customer',custSchema);
module.exports = Customer;