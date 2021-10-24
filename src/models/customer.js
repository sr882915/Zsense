const mongoose = require('mongoose')

const quarySchema = mongoose.Schema({
    name:{
        type:String,  
        required:true
    },
    m_no:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        

    }
})

const userQuary = mongoose.model('Customer', quarySchema);

module.exports = userQuary;