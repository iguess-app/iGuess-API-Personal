'use strict';

const mongoose = require('mongoose');

module.exports = (app) => {
  const Schema = mongoose.Schema;
  const db = app.src.managers.mongoManager;

  const notificationsSchema = new Schema({
    description: {
      type: String,
      required: true
    },
    positiveChoice: {
      type: String,
      required: true
    },
    negativeChoice: {
      type: String,
      required: true
    },
    saw: {
      type: Boolean,
      required: true
    }
  });

  const guessesLeaguesSchema = new Schema({
    leagueName: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  })

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
      type: String
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
    guessesLines: {
      type: Array
    },
    guessesLeagues: [guessesLeaguesSchema],
    notifications: [notificationsSchema],
    friendList: {
      type: Array
    }
  })

  return db.model('profiles', profileSchema);
}