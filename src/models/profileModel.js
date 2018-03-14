'use strict'

const mongoose = require('mongoose')

const optionsSchemas = require('./optionsSchemas/optionsSchemas')
const logoSchema = require('./subValidations/logo')
const db = require('./connect')

module.exports = (app) => {
  const Utils = app.coincidents.Utils
  const Config = app.coincidents.Config
  const mongo = Config.mongo

  const Schema = mongoose.Schema
  const serverErrors = Utils.errorUtils.serverErrors
  const userErrors = Utils.errorUtils.userErrors

  const USERNAME_MAX_SIZE = Config.profile.userNameMaxSize
  const NAME_MAX_SIZE = Config.profile.nameMaxSize
  const DESCRIPTION_MAX_SIZE = Config.profile.descriptionMaxSize
  const TEAM_TO_APPRECIATE_MAX_SIZE = Config.profile.maxTeamToAppreciateAllowed

  const checkUserNameSize = (name) => name.length <= USERNAME_MAX_SIZE
  const checkNameSize = (name) => name.length <= NAME_MAX_SIZE
  const checkDescriptionSize = (name) => name.length <= DESCRIPTION_MAX_SIZE
  const checkAppreciatedTeamsArraySize = (array) => array.length <= TEAM_TO_APPRECIATE_MAX_SIZE

  const teamSchema = new Schema({
    teamRef: {
      type: String,
      required: true,
      validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
    },
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
      type: logoSchema
    }
  }, optionsSchemas._idAndVersionKeyDisable)

  const profileDefinitionSchema = {
    userName: {
      type: String,
      required: true,
      unique: true,
      validate: [checkUserNameSize, String(userErrors.userNameSizeExplode)]
    },
    name: {
      type: String,
      validate: [checkNameSize, String(userErrors.nameSizeExplode)]
    },
    avatar: {
      type: String
    },
    footballSupportedTeams: {
      supportedTeam: teamSchema,
      appreciatedTeams: {
        type: [teamSchema],
        validate: [checkAppreciatedTeamsArraySize, String(userErrors.numberOfAppreciatedTeamsExplode)]
      }
    },
    description: {
      type: String,
      validate: [checkDescriptionSize, String(userErrors.descriptionSizeExplode)]
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    confirmedEmail: {
      type: Boolean
    },
    friendList: {
      type: [{
        type: String,
        validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
      }]
    },
    invitedFriendList: {
      type: [{
        type: String,
        validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
      }]
    },
    lastSignInAt: {
      type: Date
    }
  }

  const profileSchema = new Schema(profileDefinitionSchema, optionsSchemas.optionsProfileSchema)

  return db.model('profiles', profileSchema)
}

/*eslint max-statements: 0*/