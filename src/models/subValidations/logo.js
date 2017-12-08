'use strict'

const mongoose = require('mongoose')

const optionsSchemas = require('../optionsSchemas/optionsSchemas')

const Schema = mongoose.Schema

const logoSchema = new Schema({
  mini: {
    type: String,
    required: true
  },
  small: {
    type: String,
    required: true
  },
  normal: {
    type: String,
    required: true
  }
}, optionsSchemas._idAndVersionKeyDisable)

module.exports = logoSchema