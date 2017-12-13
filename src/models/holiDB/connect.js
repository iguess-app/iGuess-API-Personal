'use strict'

const coincidents = require('iguess-api-coincidents')

const Managers = coincidents.Managers
const mongo = coincidents.Config.mongo
const HOLI_DB_URI = `mongodb://${mongo.host}:${mongo.port}/${mongo.holiDB}`
let address = ''

mongo.holiAddress ? address = mongo.holiAddress : address = HOLI_DB_URI
const db = Managers.mongoManager(address)

module.exports = db