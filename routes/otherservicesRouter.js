const Router = require('express')
const router = new Router()
const otherservicesController = require('../controllers/otherservicesController')


router.post('/', otherservicesController.create)
router.get('/', otherservicesController.getAll)
router.get('/:id', otherservicesController.getOne)


module.exports = router