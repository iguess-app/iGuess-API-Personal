'use strict'

module.exports = (app) => {
  const profilesServices = app.src.services.profileUpdates
  const updateInfoService = profilesServices.updateInfoService
  const updatePasswordService = profilesServices.updatePasswordService
  const updateAvatarService = profilesServices.updateAvatarService
  const updateSupportedTeamService = profilesServices.updateSupportedTeamService
  const updateAppreciatedTeamsService = profilesServices.updateAppreciatedTeamsService

  const updateInfo = (request, reply) => {
    updateInfoService.updateInfo(request.payload, request.headers)
      .then((updateResponse) => {
        reply(updateResponse)
      })
      .catch((err) => reply(err))
  }

  const updatePassword = (request, reply) => {
    updatePasswordService.updatePassword(request.payload, request.headers)
      .then((updateResponse) => {
        reply(updateResponse)
      })
      .catch((err) =>
        reply(err)
      )
  }

  const updateAvatar = (request, reply) => {
    updateAvatarService.updateAvatar(request.payload, request.headers)
      .then((updateResponse) => {
        reply(updateResponse)
      })
      .catch((err) =>
        reply(err)
      )
  }
   
  const updateSupportedTeam = (request, reply) => {
    updateSupportedTeamService.updateSupportedTeam(request.payload, request.headers)
      .then((updateResponse) => {
        reply(updateResponse)
      })
      .catch((err) =>
        reply(err)
      )
  }

  const updateAppreciatedTeams = (request, reply) => {
    updateAppreciatedTeamsService.updateAppreciatedTeams(request.payload, request.headers)
      .then((updateResponse) => {
        reply(updateResponse)
      })
      .catch((err) =>
        reply(err)
      )
  }


  return {
    updateInfo,
    updatePassword,
    updateAvatar,
    updateSupportedTeam,
    updateAppreciatedTeams
  }
}

/*eslint max-statements: 0*/