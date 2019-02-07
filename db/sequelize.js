const Sequelize = require('sequelize')

const sequelize = new Sequelize('postgres://postgres:123456@localhost:5433/hooks_express_todo')


  module.exports = sequelize