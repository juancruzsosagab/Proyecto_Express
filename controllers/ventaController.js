const ventaModel = require("../models/VentaModel");
const productsModel = require("../models/productsModels");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
/*    
    create: async function (req, res, next) {
        console.log(req.body);
        try {
            const user = new usersModel({
                name: req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            const usr = await user.save();
            res.json(usr)
        } catch (e) {
            next(e)
        }
    },
    login: async function (req, res, next) {
        try {
            const user = await usersModel.findOne({email:req.body.email})
            if(user){
                if(bcrypt.compareSync(req.body.password,user.password)){
                    const token = jwt.sign({userId:user._id},req.app.get("secretKey"));
                    res.json({token:token})
                }else{
                    res.json({error:"El password es incorrecto"})
                }
            }else{
                res.json({error:"el email no esta registrador"})
            }
        } catch (e) {
            next(e)
        }
    }
}
*/

/*getAll: async (req, res, next) => {
    try{
        console.log(req.body.tokenData)

        let queryFind={};
        if(req.query.buscar){
            queryFind={name:{$regex:".*"+req.query.buscar+".*",$options:"i"}} //buscar por nombre similar al like
        }
        console.log(queryFind)
        const productos = await productsModel.paginate(queryFind,{
            
            //sort:{[req.query.sort]:req.query.sortOrder},
            sort:{name:1},
            populate:"category",
            limit:req.query.limit || 1,
            page:req.query.page || 1 //numero de pagina
        });
        res.status(200).json(productos);
    }catch(e){
        next(e)
    }
    
},*/
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
        console.log("hola");
        const producto = await productsModel.findById(req.body.product_id);//ver como recibo el id del producto, la autenticación del usuario ya está guardada con el token
        if(!producto){
            res.status(200).json({msg:"no existe el producto"})
            return;   
        }
       if(producto.quantity<1)
        {
            res.status(200).json({msg:"no hay stock disponible"})
            return;  
        }
        const today = new Date();
        //const user id =  ver como recibo el token para sacar el user id
        const venta = new ventaModel({
                product_id: req.body.product_id,
                usuario_id: req.body.usuario_id,
                fecha: today,
                product_name: producto.name,
                cant_comp: req.body.cant_comp,
                price: req.body.price,
                payment: { 
                    amount: req.body.payment.amount,   
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