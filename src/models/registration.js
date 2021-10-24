const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const validator = require('validator');


const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:5
    },
    m_no: {
        type: Number,
        required: true,
        unique:true,
        min:10
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email');
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

})

// jwtauth
employeeSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id}, process.env.SECRET_KEY);        
        this.tokens = this.tokens.concat({token : token});
        await this.save();
        return token;
    } catch (e) {
      res.render('register');
    }
}

// it is used when app.js er modhye amra password k hash a na poriborton kori ba sudhu password modification er jnno kori ata uncomment krle app.js er vitorer /registration field ache setar oi pass word hash krrr function r hash krr method ta hatate hbe

// employeeSchema.pre("save", async function (next) {
//     if (this.isModified()) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// })



// now we need to create a collection 
const Register = new mongoose.model('Register', employeeSchema);

module.exports = Register;