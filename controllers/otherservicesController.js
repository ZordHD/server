const {OtherServices} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError');

class otherservicesController {
    async create(req, res) {
        const {name, text} = req.body
        const {image} = req.files
        let fileName = uuid.v4() + ".jpg"
        image.mv(path.resolve(__dirname, '../', 'static', fileName))

        const services = await OtherServices.create({name, text, image: fileName})
        return res.json(services)
    }

    async getAll(req, res) {
        const {limit, page} = req.query
        page = page || 1
        limit = limit || 8
        let offset = page * limit - limit

        let othr = await OtherServices.findAndCountAll(limit, offset);
        return res.json(othr);
    }

    async getOne(req, res) {
        const {id} = req.params
        const services = await OtherServices.findOne(
            {
                where: {id},
                include: [{model: Services, as: 'info'}]
            },
        )
        return res.json(services)
    }


}


module.exports = new otherservicesController()