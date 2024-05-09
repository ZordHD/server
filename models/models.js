const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    phone_num: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    permission: {type: DataTypes.STRING}
})

const Roles = sequelize.define('roles', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
})

const Administrators = sequelize.define('administrators', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allownull: false},
    image: {type: DataTypes.STRING, allownull: false},
    text: {type: DataTypes.STRING, allowNull: true},
})

const Moderators = sequelize.define('moderators', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    assign_date: {type: DataTypes.DATE}
})

const Feedback = sequelize.define('feedback', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, allowNull: true},
})

const Records_of_visits = sequelize.define('records_of_visits', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date_of_visit: {type: DataTypes.DATE, allowNull: false},
    exit_date: {type: DataTypes.DATE, allowNull: false},
})

const News = sequelize.define('news', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    image: {type: DataTypes.STRING, allownull: false},
    date: {type: DataTypes.DATE, allowNull: false},
    name: {type: DataTypes.STRING, allownull: false},
    text: {type: DataTypes.STRING, allowNull: true},
})

const Services = sequelize.define('services', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    image: {type: DataTypes.STRING, allownull: false},
    name: {type: DataTypes.STRING, allownull: false},
    text: {type: DataTypes.STRING, allowNull: true},
})

const Partners = sequelize.define('partners', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allownull: false},
    image: {type: DataTypes.STRING, allownull: false},
})

const Gallery = sequelize.define('gallery', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    image: {type: DataTypes.STRING, allownull: false},
})

const Documents = sequelize.define('documents', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allownull: false},
    text: {type: DataTypes.STRING, allowNull: true},
})

const Departments = sequelize.define('departments', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    image: {type: DataTypes.STRING, allownull: false},
    name: {type: DataTypes.STRING, allownull: false},
    text: {type: DataTypes.STRING, allowNull: true},
})

const Massmedia = sequelize.define('massmedia', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    image: {type: DataTypes.STRING, allownull: false},
    name: {type: DataTypes.STRING, allownull: false},
    text: {type: DataTypes.STRING, allowNull: true},
    date: {type: DataTypes.DATE, allowNull: false},
})

const Halloffame = sequelize.define('halloffame', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    image: {type: DataTypes.STRING, allownull: false},
    name: {type: DataTypes.STRING, allownull: false},
    post: {type: DataTypes.STRING, allownull: false},
    text: {type: DataTypes.STRING, allowNull: true},
})


Roles.hasMany(Users)
Users.belongsTo(Roles)

Users.hasOne(Moderators)
Moderators.belongsTo(Users)

Users.hasMany(Records_of_visits)
Records_of_visits.belongsTo(Users)

Users.hasMany(Feedback)
Feedback.belongsTo(Users)

Users.hasMany(News)
News.belongsTo(Users)

Users.hasMany(Services)
Services.belongsTo(Users)

Users.hasMany(Partners)
Partners.belongsTo(Users)

Users.hasMany(Gallery)
Gallery.belongsTo(Users)

Users.hasMany(Documents)
Documents.belongsTo(Users)

Users.hasMany(Departments)
Departments.belongsTo(Users)

Users.hasMany(Massmedia)
Massmedia.belongsTo(Users)

Users.hasMany(Halloffame)
Halloffame.belongsTo(Users)

Users.hasMany(Administrators)
Administrators.belongsTo(Users)

module.exports = {
    Users,
    Roles,
    Records_of_visits,
    Feedback,
    Administrators,
    Moderators,
    News,
    Services,
    Partners,
    Gallery,
    Documents,
    Massmedia,
    Halloffame,
    Departments
}