const Router = require('express')
const router = new Router()
const lineController = require('../controllers/lineController')


router.post('/', lineController.create)
router.get('/', lineController.getAll)
router.get('/:id', lineController.getOne)


module.exports = router