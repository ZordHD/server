const Router = require('express')
const router = new Router()
const administratorsController = require('../controllers/administratorsController')


router.post('/', administratorsController.create)
router.get('/', administratorsController.getAll)
router.get('/:id', administratorsController.getOne)


module.exports = router