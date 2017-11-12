'use strict'

module.exports = (app) => {
  const updateSupportedTeamRepository = app.src.repositories.profileUpdates.updateSupportedTeamRepository;

  const updateSupportedTeam = (payload, headers) => updateSupportedTeamRepository.updateSupportedTeam(payload, headers)

  return {
    updateSupportedTeam
  }
}