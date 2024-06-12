const Router = require('express')
const router = new Router()
const gratitudeController = require('../controllers/gratitudeController')


router.post('/', gratitudeController.create)
router.get('/', gratitudeController.getAll)
router.get('/:id', gratitudeController.getOne)


module.exports = router