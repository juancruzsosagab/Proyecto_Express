var express = require('express');
var router = express.Router();
var usersAdminController = require("../controllers/usersAdminController")
var usersWebController = require("../controllers/usersWebController")
/* GET users listing. */
router.post('/registro', usersAdminController.create)
router.post('/login', usersAdminController.validate)
router.post('/web/registro', usersWebController.create)
router.post('/web/login', usersWebController.validate)


module.exports = router;
