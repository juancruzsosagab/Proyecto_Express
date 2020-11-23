var express = require('express');
var router = express.Router();

var productsController = require("../controllers/productsController")

/* GET users listing. */
router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
//llamado a validateUser para verificar token
//router.post('/',(req,res,next)=>{req.app.validateUser(req,res,next)}, productsController.create);
router.post('/',productsController.create);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.delete);
module.exports = router;
