const mongoose = require('mongoose');
const bcrypt = require('bcrypt');    
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    work:{
        type: String,
        required: true
    },
    mobile:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    }
});


userSchema.pre("save", async function(next){

    const person = this;
    if(!person.isModified('password'))
         return next();

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash (person.password, salt);
        person.password = hashedpassword;
        next();
    }
    catch(err){
        return next(err);
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }
    catch(err){
        console.log(err);
    }
}

const person = mongoose.model("person",userSchema);
module.exports = person;