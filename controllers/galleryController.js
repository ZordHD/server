const {Gallery} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError');

class galleryController {
    async create(req, res) {
        const {image} = req.files
        let fileName = uuid.v4() + ".jpg"
        image.mv(path.resolve(__dirname, '../', 'static', fileName))

        const gallery = await Gallery.create({image: fileName})
        return res.json(gallery)
    }

    async getAll(req, res) {
        const gallr = await Gallery.findAll()
        return res.json(gallr)
    }

    async getOne(req, res) {
        const {id} = req.params
        const gallery = await Gallery.findOne(
            {
                where: {id},
                include: [{model: Gallery, as: 'info'}]
            },
        )
        return res.json(gallery)
    }


}


module.exports = new galleryController()