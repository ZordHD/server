const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer adfsdgsgs
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.users = decoded
        next()
    } catch (e) {
        
    }
}