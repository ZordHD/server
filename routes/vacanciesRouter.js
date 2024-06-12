const Router = require('express')
const router = new Router()
const vacanciesController = require('../controllers/vacanciesController')


router.post('/', vacanciesController.create)
router.get('/', vacanciesController.getAll)
router.get('/:id', vacanciesController.getOne)


module.exports = router