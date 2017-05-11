'use Strict';

//THIS FILE SHOULD BE ON GUESS MICROSERVICE< NOT HERE
module.exports = (app) => {
  const GuessesLeagues = app.coincidents.Schemas.guessesLeaguesSchema;
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