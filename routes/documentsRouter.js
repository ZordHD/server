const Router = require('express')
const router = new Router()
const documentsController = require('../controllers/documentsController')


router.post('/', documentsController.create)
router.get('/', documentsController.getAll)
router.get('/:id', documentsController.getOne)


module.exports = router