const {Documents} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError');

class documentsController {
    async create(req, res) {
        const {name, text} = req.body


        const docs = await Documents.create({name, text})
        return res.json(docs)
    }

    async getAll(req, res) {
        const doc = await Documents.findAll()
        return res.json(doc)
    }

    async getOne(req, res) {
        const {id} = req.params
        const docs = await Documents.findOne(
            {
                where: {id},
                include: [{model: Documents, as: 'info'}]
            },
        )
        return res.json(docs)
    }

}


module.exports = new documentsController()