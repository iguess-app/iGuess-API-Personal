'use strict'

const coincidents = require('iguess-api-coincidents')

const mongo = coincidents.Config.mongo
const Managers = coincidents.Managers

const HOLI_DB_URI = `mongodb://${mongo.host}:${mongo.port}/${mongo.holiDB}`
const db = Managers.mongoManager(HOLI_DB_URI)

module.exports = db