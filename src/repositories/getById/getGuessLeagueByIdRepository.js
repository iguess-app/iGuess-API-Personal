'use Strict';

//TODO: CHECK IF THIS FILE SHOULD BE ON GUESS MICROSERVICE
module.exports = (app) => {
  const GuessesLeagues = app.src.models.guessesLeaguesSchema;
  const QueryUtils = app.coincidents.Utils.queryUtils;

  const getGuessLeagueById = (guessLeagueId) => {

    const searchQuery = {
      '_id': guessLeagueId
    }

    return GuessesLeagues.findOne(searchQuery)
      .then((guessLeagueFound) => QueryUtils.makeObject(guessLeagueFound))
      .catch((err) => err)
  }


  return {
    getGuessLeagueById
  }
}