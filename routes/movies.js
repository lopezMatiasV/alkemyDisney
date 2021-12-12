let express = require('express');
let router = express.Router();
let filmController = require('../controllers/filmController')

router.get('/', filmController.all);
router.get('/:id', filmController.one);
router.post('/add', filmController.add)
router.put('/edit/:id', filmController.edit)
router.delete('/delete/:id', filmController.delete)
router.get('/search/:title', filmController.search)


module.exports = router;