const Router = require('express')
const router = new Router()
const halloffameController = require('../controllers/hallOfFameController')


router.post('/', halloffameController.create)
router.get('/', halloffameController.getAll)
router.get('/:id', halloffameController.getOne)


module.exports = router