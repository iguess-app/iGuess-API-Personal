'use strict'

const League = require('../../models/holiDB/leagueModel')

module.exports = () => {

  const listLeagues = () => {
    const searchQuery = {
      continental: false
    }

    const sortQuery = {
      country: 1
    }

    return League.find(searchQuery).sort(sortQuery)
      .then((leagues) => _filteringResponse(leagues))
  }

  return {
    listLeagues
  }
}

const _filteringResponse = (leagues) =>
  leagues.map((league) => {
    league = league.toJSON()
    league.leagueRef = league._id.toString()
    Reflect.deleteProperty(league, 'continental')
    Reflect.deleteProperty(league, '_id')

    return league
  })

/*eslint no-param-reassign:0 */