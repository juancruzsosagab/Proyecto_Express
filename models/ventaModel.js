const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage");
const ventaSchema = new mongoose.Schema({

    product_id:{
        type:mongoose.Schema.ObjectId,
        ref:"products"
    },
   
    usuario_id:{
        type:mongoose.Schema.ObjectId,
        ref:"usersWeb"
    },
    fecha:{
        type: Date,
        require: true
    },
    
    product_name:{
        type: String,
        require: [true,errorMessage.GENERAL.campo_obligatorio]

    },
    cant_comp:  {
        type: Number,
        require: [true,errorMessage.GENERAL.campo_obligatorio]
        },
    price: {
        type: Number,
        require: [true,errorMessage.GENERAL.campo_obligatorio]
    },
    payment: new mongoose.Schema({ 
        amount: Number, 
        method: {
            type: String,
            require: true,
            enum: ["mercado pago", "contado"]
            },
        status: {
            type: String,
            require: true,
            enum: ["pago rechazado", "pendiente de pago", "pagado"]
            },
        expirationDate: Date })
           

})
module.exports = mongoose.model("venta", ventaSchema)