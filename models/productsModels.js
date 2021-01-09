const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage")
const tagsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})
const imgSchema = new mongoose.Schema({
    fieldname: "String",
    originalname: "String",
    encoding: "String",
    mimetype: "String",
    destination: "String",
    filename: "String",
    path: "String",
    size: "String"
})
const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true,
        maxlength: [255,errorMessage.GENERAL.maxlength],
        trim: true,
        required: [true,errorMessage.GENERAL.campo_obligatorio]
    },
    sku: {
        type: String,
        unique: true,
        maxlength: [255,errorMessage.GENERAL.maxlength],
        trim: true,
        required: [true,errorMessage.GENERAL.campo_obligatorio]
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ["pendiente", "en_stock", "activo"]
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "categories"
    },
    price: {
        type: Number,
        min: [1,errorMessage.GENERAL.minlength],
        required: [true,errorMessage.GENERAL.campo_obligatorio],
        get: function (price_get) {
            return price_get * 1.21;
        }
    },
    quantity: Number,
    tags:[tagsSchema],
    images:imgSchema
    
});
productsSchema.statics.findBydIdAndValidate = async function(id){
    const document = await this.findById(id);
    if(!document){
        return{
            error:true,
            message:"No existe categoria"
        }
        
    }
    return document;
}
productsSchema.virtual("price_currency").get(function () {
    return "$ " + this.price;
})
productsSchema.virtual("image_path").get(function () {
    if(this.images && this.images.filename){
        return "http://localhost:3000/images/" + this.images.filename;
    }else{
        return null;
    }
    
})
productsSchema.set('toJSON', { getters: true, virtuals: true });
productsSchema.plugin(mongoose.mongoosePaginate);
module.exports = mongoose.model("products", productsSchema)