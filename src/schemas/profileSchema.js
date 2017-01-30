'use strict';

const mongoose = require('mongoose');
  
module.exports = (app) => {
  const Schema = mongoose.Schema;
  const db = app.src.managers.mongoManager;

  const profileSchema = new Schema({
    _id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    teamsSupported: {
      type: Array
    },
    description: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    guessesLines: {
      type: Array
    }
  })

  return db.model('profiles', profileSchema);
}