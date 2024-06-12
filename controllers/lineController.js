const {Line} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError');


class lineController {
    async create(req, res) {
        const {text} = req.body

        const line = await Line.create({text})
        return res.json(line)
    }

    async getAll(req, res) {
        let line = await Line.findAll({
            limit: 5
        });
        return res.json(line);
    }

    async getOne(req, res) {
        const {id} = req.params
        const line = await Line.findOne(
            {
                where: {id},
                include: [{model: Line, as: 'info'}]
            },
        )
        return res.json(line)
    }

}


module.exports = new lineController()