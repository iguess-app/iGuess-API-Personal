'use strict'

const coincidents = require('iguess-api-coincidents')

const Managers = coincidents.Managers
const Config = coincidents.Config
let db = Managers.mongoManager()

if (Config.mongo.address) {
  db = Managers.mongoManager(Config.mongo.address)
}

module.exports = db