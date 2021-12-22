let express = require('express');
let router = express.Router();
let personajeController = require('../controllers/characterController')
let verifyToken = require('../middlewares/verifyToken');

router.get('/', personajeController.all)
router.get('/:id', personajeController.one)
router.post('/add', verifyToken, personajeController.add)
router.put('/edit/:id', verifyToken, personajeController.edit)
router.delete('/delete/:id', verifyToken, personajeController.delete)
router.get('/search/:name?', personajeController.search)

module.exports = router;