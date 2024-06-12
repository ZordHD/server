const {Question} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError');


class questionController {
    async create(req, res) {
        const {head, name, email, text} = req.body

        const question = await Question.create({head, name, email, text})
        return res.json(question)
    }

    async getAll(req, res) {
        const {limit, page} = req.query
        page = page || 1
        limit = limit || 3
        let offset = page * limit - limit

        let question = await Questions.findAndCountAll(limit, offset);
        return res.json(question);
    }

    async getOne(req, res) {
        const {id} = req.params
        const question = await Question.findOne(
            {
                where: {id},
                include: [{model: Question, as: 'info'}]
            },
        )
        return res.json(question)
    }

}


module.exports = new questionController()