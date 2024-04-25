const {Records_of_visits} = require('../models/models')
const ApiError = require('../error/ApiError');


class recordsofvisitsController {
    async create(req, res) {
        const {date_of_visit, exit_date} = req.body
        const records = await Records_of_visits.create({date_of_visit, exit_date})
        return res.json(records)
    }

    async get(req, res) {
        const record = await Records_of_visits.findAll()
        return res.json(record)
    }


}


module.exports = new recordsofvisitsController()