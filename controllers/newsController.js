const {News} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError');

class newsController {
    async create(req, res) {
        const {date, name, text} = req.body
        const {image} = req.files
        let fileName = uuid.v4() + ".jpg"
        image.mv(path.resolve(__dirname, '../', 'static', fileName))

        const news = await News.create({image: fileName, date, name, text})
        return res.json(news)
    }

    async getAll(req, res) {
        const newss = await News.findAll()
        return res.json(newss)
    }

    async getOne(req, res) {
        const {id} = req.params
        const news = await News.findOne(
            {
                where: {id},
                include: [{model: News, as: 'info'}]
            },
        )
        return res.json(news)
    }

}


module.exports = new newsController()