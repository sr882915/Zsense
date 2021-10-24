const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const db = "mongodb+srv://sandip:bolbonarebokachoda@cluster0.j7xry.mongodb.net/Zsense?retryWrites=true&w=majority";
// const db = "mongodb://localhost:27017/beta";

mongoose.connect(db,{
useNewUrlParser: true,
useUnifiedTopology: true
}).then(() => {
    console.log('Connected to db successfully')
}).catch((e) => {
    console.log('Failed to connect to db')
})




const userSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        minLength:3,
        required:true
    },
    m_no:{
        type:Number,
        unique:true,
        min:10,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        minLength:8,
        required:true
    }
})



// helpful function   
userSchema.pre('save', function (next) {
    if(!this.isModified('password')) {
        return next();
    }
    this.password  = bcrypt.hashSync(this.password, 10)
    next();
})

// compare password 
userSchema.methods.comparePassword = function (plainText,callback) {
    return callback(null,bcrypt.compareSync(plainText, this.password))
}

const userModel = mongoose.model('User', userSchema);


module.exports = userModel;
