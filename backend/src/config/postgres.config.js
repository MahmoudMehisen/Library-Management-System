'use strict'

require('dotenv').config()

const { Sequelize } = require('sequelize')

const connectionConfig = {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}

let sequelize

if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize(process.env.DEV_DATABASE_URL, connectionConfig)
} else if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize(process.env.TEST_DATABASE_URL, connectionConfig)
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL, connectionConfig)
}

try {
  sequelize.authenticate()
    .then(r =>
      console.log('INFO: Connection to database has been established successfully.')
    );
} catch (err) {
  console.log('ERROR: Unable to connect to the database - ', err)
}

const db = {};

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db