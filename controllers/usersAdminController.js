const usersAdminModel = require("../models/usersAdminModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    /*validate: async (req, res, next) => {
        try{
            console.log(req.query)
            const userAdmin = await usersAdminModel.findOne({user:req.body.user});
            if(userAdmin){
                if(bcrypt.compareSync(req.body.password,userAdmin.password)){
                    //User y password ok, generar token
                    const token = jwt.sign({userId:userAdmin._id},req.app.get("secretKey"),{expiresIn:"1h"});
                    res.json({message:"usuario ok",token:token});
                }else{
                    res.json({message:"password incorrecto"});
                }
            }else{
                res.json({message:"usuario incorrecto"});
            }
        }catch(e){
            next(e)
        }
        
    },*/
    validate: async (req, res, next) => {
        try{
            console.log(req.query)
            const {error,message,userAdmin} = await usersAdminModel.validateUser(req.body.user,req.body.password);
            if(!error){
                const token = jwt.sign({userId:userAdmin._id},req.app.get("secretKey"),{expiresIn:"1h"});
                res.json({message:message,token:token});
                return;
            }
            res.json({message:message});
            console.log(error,message)
            
        }catch(e){
            next(e)
        }
        
    },
    create: async function (req, res, next) {
        try{
            console.log(req.body);
            const userAdmin = new usersAdminModel({
                name: req.body.name,
                user:req.body.user,
                password:req.body.password
            })
            const document = await userAdmin.save();
            res.json(document);
        }catch(e){
            next(e)
        }
        
    }
}