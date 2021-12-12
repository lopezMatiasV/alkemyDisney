let express = require('express');
let router = express.Router();
let userController = require('../controllers/usersController');

/* GET users listing. */
router.post('/register',userController.register);
router.post('/login',userController.login);

module.exports = router;
