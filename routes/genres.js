let express = require('express');
let router = express.Router();
let generoController = require('../controllers/genreController')

router.get('/', generoController.all)
router.get('/:id', generoController.one)


module.exports = router;