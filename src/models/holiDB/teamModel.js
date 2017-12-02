'use strict'

const mongoose = require('mongoose')
const coincidents = require('iguess-api-coincidents')

const optionsSchemas = require('../optionsSchemas/optionsSchemas')
const db = require('./connect')

const Schema = mongoose.Schema
const mongo = coincidents.Config.mongo
const serverErrors = coincidents.Utils.errorUtils.serverErrors

const teamSchema = new Schema({
  league: {
    type: String,
    required: true,
    validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
  },
  fullName: {
    type: String,
    required: true
  },
  shortName: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  }
}, optionsSchemas.versionKeyDisable)

module.exports = db.model('teams', teamSchema)