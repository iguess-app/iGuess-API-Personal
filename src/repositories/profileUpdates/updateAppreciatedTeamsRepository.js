'use strict'

const Promise = require('bluebird')
const coincidents = require('iguess-api-coincidents')

const Team = require('../../models/holiDB/teamModel')

const { errorCode, errorUtils } = coincidents.Utils
const { boom } = errorUtils

const POSITION_ZERO = 0
const POSITION_ONE = 1
const NOT_SENT_BY_USER = []

module.exports = (app) => {
  const Profile = app.src.models.profileModel

  const updateAppreciatedTeams = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)

    const firstAppreciatedTeamPromise = Team.findById(payload.firstAppreciatedTeam)
    let secondAppreciatedTeamPromise = NOT_SENT_BY_USER
    if (payload.secondAppreciatedTeam) {
      secondAppreciatedTeamPromise = Team.findById(payload.secondAppreciatedTeam)
    }

    return Promise.all([firstAppreciatedTeamPromise, secondAppreciatedTeamPromise])
      .spread((firstAppreciatedTeam, secondAppreciatedTeam) => {
        if (!firstAppreciatedTeam || !secondAppreciatedTeam) {
          throw boom('notFound', dictionary.teamNotFound, errorCode.teamNotFound)
        }
        const searchQuery = {
          userName: payload.userName
        }

        return Profile.findOne(searchQuery)
          .then((userFound) => {
            if (!userFound) {
              const errMsg = dictionary.userNotFound.replace('{{userName}}', payload.userName)
              throw boom('notFound', errMsg, errorCode.userNotFound)
            }
            const responseObj = {
              profileModified: false
            }
            const footballSupportedTeams = userFound.footballSupportedTeams
            if (_theSupportedTeamIsEqualToAppreciatedTeam(footballSupportedTeams.supportedTeam, firstAppreciatedTeam.id, secondAppreciatedTeam.id)) {
              throw boom('notAcceptable', dictionary.sameTeams, errorCode.sameTeams)
            }

            if (_isTheSameAppreciatedTeamsAtDataBase(footballSupportedTeams.appreciatedTeams, firstAppreciatedTeam.id, secondAppreciatedTeam.id)) {
              return responseObj
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
    appreciatedTeams[POSITION_ZERO] && appreciatedTeams[POSITION_ZERO].teamRef === firstAppreciatedTeamId &&
    appreciatedTeams[POSITION_ONE] && appreciatedTeams[POSITION_ONE].teamRef === secondAppreciatedTeamId

  const _theSupportedTeamIsEqualToAppreciatedTeam = (supportedTeam, firstAppreciatedTeamId, secondAppreciatedTeamId) =>
    supportedTeam && (supportedTeam.teamRef === firstAppreciatedTeamId || supportedTeam.teamRef === secondAppreciatedTeamId)

  const _getTeamObj = (team) => ({
    teamRef: team.id,
    fullName: team.fullName,
    shortName: team.shortName,
    logo: team.logo,
    league: team.league
  })

  return {
    updateAppreciatedTeams
  }
}

/*eslint max-statements: 0 */