const Router = require('express')
const router = new Router()
const foreignservicesController = require('../controllers/foreignservicesController')


router.post('/', foreignservicesController.create)
router.get('/', foreignservicesController.getAll)
router.get('/:id', foreignservicesController.getOne)


module.exports = router