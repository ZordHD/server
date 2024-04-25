const Router = require('express')
const router = new Router()
const administratorsRouter = require('./administratorsRouter')
const feedbackRouter = require('./feedbackRouter')
const moderatorsRouter = require('./moderatorsRouter')
const recordsofvisitsRouter = require('./recordsofvisitsRouter')
const rolesRouter = require('./rolesRouter')
const usersRouter = require('./usersRouter')
const newsRouter = require('./newsRouter')
const servicesRouter = require('./servicesRouter')
const partnerRouter = require('./partnersRouter')
const galleryRouter = require('./galleryRouter')




router.use('/users', usersRouter)
router.use('/feedback', feedbackRouter)
router.use('/recordsofvisits', recordsofvisitsRouter)
router.use('/news', newsRouter)
router.use('/services', servicesRouter)
router.use('/partners', partnerRouter)
router.use('/gallery', galleryRouter)


module.exports = router