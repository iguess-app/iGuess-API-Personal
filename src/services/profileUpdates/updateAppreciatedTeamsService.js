'use Strict';

const Boom = require('boom')

const POSITION_ZERO = 0
const POSITION_ONE = 1

module.exports = (app) => {
  const updateAppreciatedTeamsRepository = app.src.repositories.profileUpdates.updateAppreciatedTeamsRepository;

  const updateAppreciatedTeams = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);
    const appreciatedTeamsId = payload.appreciatedTeamsId;
    payload.firstAppreciatedTeam = appreciatedTeamsId[POSITION_ZERO]
    payload.secondAppreciatedTeam = appreciatedTeamsId[POSITION_ONE]

    if (payload.firstAppreciatedTeam && payload.firstAppreciatedTeam === payload.secondAppreciatedTeam) {
      throw Boom.notAcceptable(dictionary.sameTeams)
    }

    if (!payload.firstAppreciatedTeam && payload.secondAppreciatedTeam) {
      payload.firstAppreciatedTeam = payload.secondAppreciatedTeam
      payload.secondAppreciatedTeam = null
    }

    return updateAppreciatedTeamsRepository.updateAppreciatedTeams(payload, headers)
    .catch((err) => {
      if (err.kind === 'ObjectId') {
       throw Boom.conflict('The ID sent is not the expected format');
      }

      return err;
    })
  }

  return {
    updateAppreciatedTeams
  }
}