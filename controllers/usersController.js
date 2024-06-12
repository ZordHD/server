const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const{Users} = require('../models/models')


const generateJwt = (id, email, permission) => {
    return jwt.sign(
        {id, email, permission},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )

}



class usersController {
    async registration(req, res) {
        const{email, name, surname, phone_num, password, permission} = req.body
        if(!email || !password){
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        const candidate = await Users.findOne({where: {email}})
        if(candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const users = await Users.create({email, name, surname, phone_num, permission, password: hashPassword})
        const token = generateJwt(users.id, users.email, users.permission)
        return res.json({token})
    }   

    async login(req, res, next) {
        const{name, surname, email, phone_num, password, permission} = req.body
        const users = await Users.findOne({where: {email}})
        if (!users) {
            return next(ApiError.internal('Пользователь с таким email не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, users.password)
        if (!comparePassword) {
            return next(ApiError.internal('Неверный пароль'))
        }
        const token = generateJwt(users.id, users.email, users.permission)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.users.id, req.users.email, req.users.permission)
        return res.json({token})
    }
}


module.exports = new usersController()