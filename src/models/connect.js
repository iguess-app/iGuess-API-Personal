'use strict'

const coincidents = require('iguess-api-coincidents')

const Managers = coincidents.Managers
const mongo = coincidents.Config.mongo
const PERSONAL_DB_URI = `mongodb://${mongo.host}:${mongo.port}/${mongo.database}`
let address = ''

mongo.personalAddress ? address = mongo.personalAddress : address = PERSONAL_DB_URI
const db = Managers.mongoManager(address)

module.exports = db