const {Roles} = require('../models/models')
const ApiError = require('../error/ApiError');
 


class rolesController {
    async create(req, res) {
        const {title} = req.body
        const roles = await Roles.create({title})
        return res.json(roles)
    }

    async getAll(req, res) {
        const allroles = await Roles.findAll()
        return res.json(allroles)
    }

    async getOne(req, res){

    }
}


module.exports = new rolesController()