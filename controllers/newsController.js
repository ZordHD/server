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
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 3
        let offset = page * limit - limit

        let news = await News.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        return res.json(news);
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