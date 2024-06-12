const {Massmedia} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError');

class massmediaController {
    async create(req, res) {
        const {date, name, text} = req.body
        const {image} = req.files
        let fileName = uuid.v4() + ".jpg"
        image.mv(path.resolve(__dirname, '../', 'static', fileName))

        const massm = await Massmedia.create({image: fileName, date, name, text})
        return res.json(massm)
    }

    async getAll(req, res) {
        const mass = await Massmedia.findAll({
            limit: 3
        })
        return res.json(mass)
    }

    async getOne(req, res) {
        const {id} = req.params
        const massm = await Massmedia.findOne(
            {
                where: {id},
                include: [{model: Massmedia, as: 'info'}]
            },
        )
        return res.json(massm)
    }

}


module.exports = new massmediaController()