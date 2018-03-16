'use strict'

const mongoose = require('mongoose')
const coincidents = require('iguess-api-coincidents')

const optionsSchemas = require('../optionsSchemas/optionsSchemas')
const logoSchema = require('../subValidations/logo')
const db = require('./connect')

const Schema = mongoose.Schema
const serverErrors = coincidents.Utils.errorUtils.serverErrors
const config = coincidents.Config

const _validAssociation = (association) => config.associations.includes(association)

const leagueSchema = new Schema({
  country: {
    type: String,
    required: true
  },
  countryInitials: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  serie: {
    type: Number
  },
  association: {
    type: String,
    validate: [_validAssociation, String(serverErrors.notAssociationValid)],
    required: true
  },
  continental: {
    type: Boolean,
    required: true
  },
  haveActiveLines: {
    type: Boolean,
    required: true
  },
  flag: {
    type: logoSchema,
    required: true
  }
}, optionsSchemas.versionKeyDisable)

module.exports = db.model('leagues', leagueSchema)