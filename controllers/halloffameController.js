const {Halloffame} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError');

class halloffameController {
    async create(req, res) {
        const {name, text, post} = req.body
        const {image} = req.files
        let fileName = uuid.v4() + ".jpg"
        image.mv(path.resolve(__dirname, '../', 'static', fileName))

        const hof = await Halloffame.create({image: fileName, name, text, post})
        return res.json(hof)
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 8
        let offset = page * limit - limit

        let hofs = await Halloffame.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        return res.json(hofs);
    }

    async getOne(req, res) {
        const {id} = req.params
        const hof = await Halloffame.findOne(
            {
                where: {id},
                include: [{model: Halloffame, as: 'info'}]
            },
        )
        return res.json(hof)
    }

}


module.exports = new halloffameController()