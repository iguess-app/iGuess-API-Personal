'use strict'

const mongoose = require('mongoose')

const optionsSchemaNoIdNoVersion = {
  versionKey: false,
  _id: false
}

module.exports = (app) => {
  const Utils = app.coincidents.Utils
  const mongo = app.coincidents.Config.mongo

  const Schema = mongoose.Schema
  const serverErrors = Utils.errorUtils.serverErrors

  const championshipSchema = new Schema({
    championshipRef: {
      type: String,
      unique: true,
      required: true,
      validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
    },
    league: {
      type: String,
      required: true,
      validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
    },
    season: {
      type: String,
      required: true
    },
    championship: {
      type: String,
      required: true
    }
  }, optionsSchemaNoIdNoVersion)
  
  return championshipSchema
}