const {News, Services} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError');

class servicesController {
    async create(req, res) {
        const { name, text} = req.body
        const {image} = req.files
        let fileName = uuid.v4() + ".jpg"
        image.mv(path.resolve(__dirname, '../', 'static', fileName))

        const services = await Services.create({image: fileName, name, text})
        return res.json(services)
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 3
        let offset = page * limit - limit

        let services = await Services.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        return res.json(services);
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