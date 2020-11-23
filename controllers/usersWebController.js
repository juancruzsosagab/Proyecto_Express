const usersWebModel = require("../models/usersWebModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    validate: async (req, res, next) => {
        try{
            console.log(req.query)
            const {error,message,userWeb} = await usersWebModel.validateUser(req.body.email,req.body.password);
            if(!error){
                const token = jwt.sign({userId:userWeb._id},req.app.get("secretKey"),{expiresIn:"1h"});
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
            const userWeb = new usersWebModel({
                name: req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            const document = await userWeb.save();
            res.json(document);
        }catch(e){
            next(e)
        }
        
    }
}