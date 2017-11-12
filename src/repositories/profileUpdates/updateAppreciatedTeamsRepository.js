'use strict'

const Boom = require('boom')
const Promise = require('bluebird')

const POSITION_ZERO = 0
const POSITION_ONE = 1
const NOT_SENT_BY_USER = []

module.exports = (app) => {
  const Profile = app.src.models.profileModel;
  const Team = app.src.models.teamSchema;

  const updateAppreciatedTeams = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);

    const firstAppreciatedTeamPromise = Team.findById(payload.firstAppreciatedTeam)
    let secondAppreciatedTeamPromise = NOT_SENT_BY_USER;
    if (payload.secondAppreciatedTeam) {
      secondAppreciatedTeamPromise = Team.findById(payload.secondAppreciatedTeam)
    }

    return Promise.all([firstAppreciatedTeamPromise, secondAppreciatedTeamPromise])
      .spread((firstAppreciatedTeam, secondAppreciatedTeam) => {
        if (!firstAppreciatedTeam || !secondAppreciatedTeam) {
          throw Boom.notFound(dictionary.teamNotFound)
        }
        const searchQuery = {
          userName: payload.userName
        }

        return Profile.findOne(searchQuery)
          .then((userFound) => {
            if (!userFound) {
              const errMsg = dictionary.userNotFound.replace('{{userName}}', payload.userName)
              throw Boom.notFound(errMsg)
            }
            const responseObj = {
              profileModified: false
            }
            const footballSupportedTeams = userFound.footballSupportedTeams;
            if (_theSupportedTeamIsEqualToAppreciatedTeam(footballSupportedTeams.supportedTeam, firstAppreciatedTeam.id, secondAppreciatedTeam.id)) {
              throw Boom.notAcceptable(dictionary.sameTeams)
            }

            if (_isTheSameAppreciatedTeamsAtDataBase(footballSupportedTeams.appreciatedTeams, firstAppreciatedTeam.id, secondAppreciatedTeam.id)) {
              return responseObj;
            }

            if (secondAppreciatedTeam === NOT_SENT_BY_USER) {
              userFound.footballSupportedTeams.appreciatedTeams.pop()
            } else if (secondAppreciatedTeam) {
              userFound.footballSupportedTeams.appreciatedTeams[POSITION_ONE] = _getTeamObj(secondAppreciatedTeam)
            }
            userFound.footballSupportedTeams.appreciatedTeams[POSITION_ZERO] = _getTeamObj(firstAppreciatedTeam)
            userFound.save()
            responseObj.profileModified = true

            return responseObj
          })
      })
  }

  const _isTheSameAppreciatedTeamsAtDataBase = (appreciatedTeams, firstAppreciatedTeamId, secondAppreciatedTeamId) =>
    appreciatedTeams[POSITION_ZERO] && appreciatedTeams[POSITION_ZERO].teamId === firstAppreciatedTeamId &&
    appreciatedTeams[POSITION_ONE] && appreciatedTeams[POSITION_ONE].teamId === secondAppreciatedTeamId

  const _theSupportedTeamIsEqualToAppreciatedTeam = (supportedTeam, firstAppreciatedTeamId, secondAppreciatedTeamId) =>
    supportedTeam && (supportedTeam.teamId === firstAppreciatedTeamId || supportedTeam.teamId === secondAppreciatedTeamId)

  const _getTeamObj = (team) => ({
    teamId: team.id,
    fullName: team.fullName,
    shortName: team.shortName,
    logo: team.logo,
    league: team.league
  })

  return {
    updateAppreciatedTeams
  }
}