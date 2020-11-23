var express = require('express');
var router = express.Router();
const ventaController = require("../controllers/ventaController.js");
/* GET users listing. */
router.post('/'/*,(req,res,next)=>{req.app.validateUser(req,res,next)}*/,  ventaController.create);
router.get('/:id', ventaController.getById);
//router.post('/', ventaController.create);

module.exports = router;