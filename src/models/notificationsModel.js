'use strict'

const mongoose = require('mongoose');

const optionsSchemas = require('./optionsSchemas/optionsSchemas')

module.exports = (app) => {
  const Managers = app.coincidents.Managers
  const Utils = app.coincidents.Utils
  const mongo = app.coincidents.Config.mongo

  const db = Managers.mongoManager()
  const Schema = mongoose.Schema
  const serverErrors = Utils.errorUtils.serverErrors

  const championshipEmbeddedSchema = require('./subValidations/championshipEmbeddedModel')(app)

  const notificationsArraySchema = new Schema({
    messageType: {
      type: Number,
      required: true
    },
    messageUserRef: {
      type: String
    },
    messageGuessLeagueRef: {
      type: String
    },
    saw: {
      type: Boolean,
      required: true,
      default: false
    },
    championship: championshipEmbeddedSchema
  }, optionsSchemas.versionKeyDisable)

  const notificationsSchema = new Schema({
    userRef: {
      type: String,
      required: true,
      validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
    },
    notifications: [notificationsArraySchema]
  }, optionsSchemas.versionKeyDisable)


  return db.model('profilenotifications', notificationsSchema)
}