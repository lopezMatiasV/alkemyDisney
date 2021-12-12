let express = require('express');
let router = express.Router();
let personajeController = require('../controllers/characterController')

router.get('/', personajeController.all)
router.get('/:id', personajeController.one)
router.post('/add', personajeController.add)
router.put('/edit/:id', personajeController.edit)
router.delete('/delete/:id', personajeController.delete)
router.get('/search/:name?', personajeController.search)

module.exports = router;