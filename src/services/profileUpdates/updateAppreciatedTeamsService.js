'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')

const sessionManager = require('../../managers/sessionManager')

const { errorCode, errorUtils } = coincidents.Utils
const { boom } = errorUtils

const POSITION_ZERO = 0
const POSITION_ONE = 1

module.exports = (app) => {
  const updateAppreciatedTeamsRepository = app.src.repositories.profileUpdates.updateAppreciatedTeamsRepository

  const updateAppreciatedTeams = async (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    
    const session = await sessionManager.getSession(headers, dictionary)
    payload.userName = session.userName

    const appreciatedTeamsId = payload.appreciatedTeamsId
    payload.firstAppreciatedTeam = appreciatedTeamsId[POSITION_ZERO]
    payload.secondAppreciatedTeam = appreciatedTeamsId[POSITION_ONE]

    if (payload.firstAppreciatedTeam && payload.firstAppreciatedTeam === payload.secondAppreciatedTeam) {
      throw boom('notAcceptable', dictionary.sameTeams, errorCode.sameTeams)
    }

    if (!payload.firstAppreciatedTeam && payload.secondAppreciatedTeam) {
      payload.firstAppreciatedTeam = payload.secondAppreciatedTeam
      payload.secondAppreciatedTeam = null
    }

    return updateAppreciatedTeamsRepository.updateAppreciatedTeams(payload, headers)
      .catch((err) => {
        if (err.kind === 'ObjectId') {
        throw Boom.conflict('The ID sent is not the expected format')
        }

        return err
      })
  }

  return {
    updateAppreciatedTeams
  }
}

/*eslint max-statements: 0 */