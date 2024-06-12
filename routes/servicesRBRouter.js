const Router = require('express')
const router = new Router()
const servicesRBController = require('../controllers/servicesRBController')


router.post('/', servicesRBController.create)
router.get('/', servicesRBController.getAll)
router.get('/:id', servicesRBController.getOne)


module.exports = router