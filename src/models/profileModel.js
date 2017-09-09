'use strict'

const mongoose = require('mongoose');

const optionsSchemas = require('./optionsSchemas/optionsSchemas')

module.exports = (app) => {
  const Managers = app.coincidents.Managers
  const Utils = app.coincidents.Utils
  const Config = app.coincidents.Config
  const mongo = Config.mongo

  const db = Managers.mongoManager
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

  const guessesLinesSchema = new Schema({
    championshipRef: {
      type: String,
      required: true,
      validate: [mongo.checkObjectId, String(serverErrors.notMongoIdValid)]
    },
    pontuation: {
      type: Number,
      required: true
    }
  }, optionsSchemas._idAndVersionKeyDisable)

  const teamSchema = new Schema({
    teamId: {
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
      type: String,
      required: true
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
    guessesLines: [guessesLinesSchema],
    guessesLeagues: {
      type: Array
    },
    friendList: {
      type: [Schema.Types.ObjectId]
    },
    invitedFriendList: {
      type: [Schema.Types.ObjectId]
    },
    lastSignInAt: {
      type: Date
    }
  }

  const profileSchema = new Schema(profileDefinitionSchema, optionsSchemas.optionsProfileSchema)

  return db.model('profiles', profileSchema)

}

/*eslint max-statements: 0*/