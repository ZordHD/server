const {Feedback} = require('../models/models')
const ApiError = require('../error/ApiError');

class feedbackController {
    async create(req, res) {
        const {name, text} = req.body
        const feedback = await Feedback.create({name, text})
        return res.json(feedback)
    }

    async getAll(req, res) {
        const feedbacks = await Feedback.findAll()
        return res.json(feedbacks)
    }


}


module.exports = new feedbackController()