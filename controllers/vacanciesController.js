const fs = require('fs');
const {Vacancies} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError');


class vacanciesController {
    async create(req, res) {
        const {name, price, text} = req.body
        const {image} = req.files
        let fileName = uuid.v4() + ".jpg"
        image.mv(path.resolve(__dirname, '../', 'static', fileName))

        const vacs = await Vacancies.create({image: fileName, name, price, text})
        return res.json(vacs)
    }

    async getAll(req, res) {

        let vacs = await Vacancies.findAll();
        return res.json(vacs);
    }

    async getOne(req, res) {
        const {id} = req.params
        const vacs = await News.findOne(
            {
                where: {id},
                include: [{model: Vacancies, as: 'info'}]
            },
        )
        return res.json(vacs)
    }

}


module.exports = new vacanciesController()