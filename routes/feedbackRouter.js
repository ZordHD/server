const Router = require('express')
const router = new Router()
const feedbackController = require('../controllers/feedbackController')
const checkPermission = require('../middleware/checkRoleMiddleware')

router.post('/', checkPermission('USER'), feedbackController.create)
router.get('/', feedbackController.getAll)

module.exports = router