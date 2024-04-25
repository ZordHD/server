const Router = require('express')
const router = new Router()
const rolesController = require('../controllers/rolesController')

router.post('/', rolesController.create)
router.get('/', rolesController.getAll)

module.exports = router