const {Administrators} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError');

class administratorsController {
    async create(req, res) {
        const {name, text} = req.body
        const {image} = req.files
        let fileName = uuid.v4() + ".jpg"
        image.mv(path.resolve(__dirname, '../', 'static', fileName))

        const admins = await Administrators.create({image: fileName, name, text})
        return res.json(admins)
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 3
        let offset = page * limit - limit

        let admins = await Administrators.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        return res.json(admins);
    }

    async getOne(req, res) {
        const {id} = req.params
        const admins = await Administrators.findOne(
            {
                where: {id},
                include: [{model: Administrators, as: 'info'}]
            },
        )
        return res.json(admins)
    }

}


module.exports = new administratorsController()