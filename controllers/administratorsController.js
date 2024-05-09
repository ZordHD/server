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
        const admin = await Administrators.findAll()
        return res.json(admin)
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