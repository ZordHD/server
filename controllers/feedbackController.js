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

    async getOne(req, res) {
        const {id} = req.params
        const feedback = await Feedback.findOne(
            {
                where: {id},
                include: [{model: Feedback, as: 'info'}]
            },
        )
        return res.json(feedback)
    }

}


module.exports = new feedbackController()