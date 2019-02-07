const Sequelize = require('sequelize')

const sequelize = require('../db/sequelize')

const Item = sequelize.define('item', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Item