const mongoose = require("../bin/mongodb");
const bcrypt = require('bcrypt');
const errorMessage = require("../util/errorMessage")
const validators = require("../util/validators")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,errorMessage.GENERAL.campo_obligatorio],
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:[true,errorMessage.GENERAL.campo_obligatorio]
    },
    password:{
        type:String,
        required:[true,errorMessage.GENERAL.campo_obligatorio],
        validate:{
            validator: async function(v){
                return validators.isGoodPassword(v);
            },
            message:errorMessage.USERSADMIN.passwordIncorrect
        }
    }
})
userSchema.pre("save",function(next){
    this.password = bcrypt.hashSync(this.password,10);
    next();
})
userSchema.statics.validateUser = async function(email,password){
    const userWeb = await this.findOne({email:email});
    
    if(userWeb){
        if(bcrypt.compareSync(password,userWeb.password)){
            //User y password ok, generar token
            
            return {error:false,message:"usuario ok",userWeb:userWeb};
        }else{
            return {error:true,message:"password incorrecto"};
        }
    }else{
        return {error:true,message:"usuario incorrecto"};
    }
}
module.exports = mongoose.model("usersWeb",userSchema);