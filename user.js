const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');
const userSchema = new mongoose.schema({
    firstname: {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },
    lastname: {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },
    email: {
        type : String,
        required : true,
        unique : true,
        minlength : 10,
        maxlength : 30
    },

    adress: {
        type : String,
        required : true,
        unique : true,
        minlength : 5,
        maxlength :30 
    },

    city : {
        type : String,
        required : true,
        minlength : 5,
        maxlength :20 
    },

    state : {
        type : String,
        required : true,
        unique : true,
        length : 1
    },


     password: {
        type : String,
        required : true,
        minlength : 6,
    }


})
//middleware pour hacher le mot de passe avant de dsauveegarder l'utilisateur
userSchema.pre('save',async function(next){
    if(!this.isModified('password'))return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password.salt);
    next()
})
//methode pour comparer les mots de passe
userSchema.methods.matchPassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};
const user=mongoose.model('user',userSchema);
module.exports= user;

