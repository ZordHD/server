const {Partners} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError');

class partnersController {
    async create(req, res) {
        const {name} = req.body
        const {image} = req.files
        let fileName = uuid.v4() + ".jpg"
        image.mv(path.resolve(__dirname, '../', 'static', fileName))

        const partners = await Partners.create({name, image: fileName})
        return res.json(partners)
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 5
        let offset = page * limit - limit

        let partners = await Partners.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        return res.json(partners);
    }

    async getOne(req, res) {
        const {id} = req.params
        const partners = await Partners.findOne(
            {
                where: {id},
                include: [{model: Partners, as: 'info'}]
            },
        )
        return res.json(partners)
    }


}


module.exports = new partnersController()