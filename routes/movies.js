let express = require('express');
let router = express.Router();
let moviesController = require('../controllers/moviesController')
let verifyToken = require('../middlewares/verifyToken');

router.get('/', moviesController.all);
router.get('/:id', moviesController.one);
router.post('/add', verifyToken, moviesController.add)
router.put('/edit/:id', verifyToken, moviesController.edit)
router.delete('/delete/:id', verifyToken, moviesController.delete)
router.get('/search/:title', moviesController.search)


module.exports = router;