var express = require('express');
var router = express.Router();
const ventaController = require("../controllers/ventaController.js");
/* GET users listing. */
router.post('/', ventaController.create);
/*router.post('/',(req,res,next)=>{req.app.validateUser(req,res,next)},  ventaController.create);*/
router.get('/buscar/:id', ventaController.getById);
router.get('/', ventaController.getAll);
//router.get('/:id',(req,res,next)=>{req.app.validateUser(req,res,next)}, ventaController.getById);
//router.post('/', ventaController.create);

module.exports = router;