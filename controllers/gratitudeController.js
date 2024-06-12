const {Gratitude} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError');


class gratitudeController {
    async create(req, res) {
        const {head, name, email, text} = req.body

        const grat = await Gratitude.create({head, name, email, text})
        return res.json(grat)
    }

    async getAll(req, res) {
        const {limit, page} = req.query
        page = page || 1
        limit = limit || 3
        let offset = page * limit - limit

        let grat = await Gratitude.findAndCountAll(limit, offset);
        return res.json(grat);
    }

    async getOne(req, res) {
        const {id} = req.params
        const grat = await Gratitude.findOne(
            {
                where: {id},
                include: [{model: Gratitude, as: 'info'}]
            },
        )
        return res.json(grat)
    }

}


module.exports = new gratitudeController()