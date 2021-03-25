const ventaModel = require("../models/VentaModel");
const productsModel = require("../models/productsModels");
const usersWebModel = require("../models/usersWebModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');



module.exports = {

    getAll: async (req, res, next) => {
        try{
            
            let queryFind = {};
            console.log("asd"+req.body.userWeb);
            //Ver acá de usar Global state y context en React
            const userWeb = req.params.userId;
            console.log(userWeb);
            if(userWeb){
                queryFind = {"usuario_id:":req.params.userId};
            }
            
            console.log(queryFind)
            const documento = await ventaModel.paginate(queryFind,{
                              
                sort: {product_name:1},
                populate: 'producto_id',
                limit:req.query.limit || 16,
                page:req.query.page || 1 //numero de pagina
            });
            res.status(200).json(documento);
        }catch(e){
            next(e)
        }
        
    },
getById: async function (req, res, next) {
    try{
        
        console.log(req.params.id);
        const venta = await ventaModel.findById(req.params.id);
        if(!venta){
            res.status(200).json({msg:"no existe la venta"})
            return; //Siempre despues de un res un return
        }
        res.status(200).json(venta);
    }catch(e){
        next(e)
    }
    
},
create: async function (req, res, next) {
    
     try{
        console.log(req.body.product_id)
        
        const producto = await productsModel.findById(req.body.product_id);
        if(!producto){
            res.status(200).json({msg:"no existe el producto"})
            return;   
        }
       if(producto.quantity<1)
        {
            res.status(200).json({msg:"no hay stock disponible"})
            return;  
        }
        //Recibo el user para enviar email y que se guarde en la venta
        const userWeb = await usersWebModel.findById(req.body.usuario_id);
        console.log(userWeb)
        const today = new Date();
        
        const venta = new ventaModel({
                product_id: req.body.product_id,
                /*usuario_id: req.body.usuario_id,*/
                fecha: today,
                product_name: producto.name,
                cant_comp: 1,
                price: producto.price,
                usuario_id: req.body.usuario_id,
                payment: { 
                    amount: producto.price,   
                    method: req.body.payment.method,                 
                    status: req.body.payment.status,                  
                    expirationDate: today 
                }
            
        })
        console.log(venta)
        
        console.log("esto es ",producto.quantity)
        const document = await venta.save();
        
       if(document){
            producto.quantity--
            console.log(producto.quantity)
            document2 = await producto.save()
            
            //Send email
            
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD 
                }
            });
            const mailOptions = {
                from: "riverplate949494", 
                to: userWeb.email, //VER DE TRAER EL EMAIL
                subject: 'Compra exitosa',
                text: 'Tu compra ha sido exitosa, el producto que compraste es '+producto.name
            };
            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                 console.log('Error occurs',err);
                }
                 console.log('Email sent!!!');
            })

        }
        
       
       res.status(201).json(document);
    }catch(e){
        console.log(e);
        console.log("error")
        //e.status=204;
        next(e);
    }
    
},
update: async function (req, res, next) {
    try{
        console.log(req.params.id, req.body);
        const producto = await productsModel.update({ _id: req.params.id }, req.body, { multi: false })
        res.status(200).json(producto);
    }catch(e){
        next(e)
    }
    
},
delete: async function (req, res, next) {
    try{
        console.log(req.params.id);
        const data = await productsModel.deleteOne({ _id: req.params.id });
        res.status(200).json(data);
    }catch(e){
        next(e)
    }
    
}
}