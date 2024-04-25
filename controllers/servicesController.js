const {Services} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError');

class servicesController {
    async create(req, res) {
        const {name, text} = req.body
        const {image} = req.files
        let fileName = uuid.v4() + ".jpg"
        image.mv(path.resolve(__dirname, '../', 'static', fileName))

        const services = await Services.create({name, text, image: fileName})
        return res.json(services)
    }

    async getAll(req, res) {
        const servs = await Services.findAll()
        return res.json(servs)
    }

    async getOne(req, res) {
        const {id} = req.params
        const services = await Services.findOne(
            {
                where: {id},
                include: [{model: Services, as: 'info'}]
            },
        )
        return res.json(services)
    }


}


module.exports = new servicesController()