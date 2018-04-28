'use strict'

const coincidents = require('iguess-api-coincidents')

const Team = require('../../models/holiDB/teamModel')

const { errorCode, errorUtils } = coincidents.Utils
const { boom } = errorUtils

module.exports = (app) => {
  const Profile = app.src.models.profileModel

  const updateSupportedTeam = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)

    return Team.findById(payload.supportedTeamId)
      .then((teamChosen) => {
        if (!teamChosen) {
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
            if (footballSupportedTeams.supportedTeam && footballSupportedTeams.supportedTeam.teamRef === teamChosen.id) {
              return responseObj
            }
            userFound.footballSupportedTeams.supportedTeam = {
              teamRef: teamChosen.id,
              fullName: teamChosen.fullName,
              shortName: teamChosen.shortName,
              logo: teamChosen.logo,
              league: teamChosen.league
            }
            userFound.save()
            responseObj.profileModified = true

            return responseObj
          })
      })

  }

  return {
    updateSupportedTeam
  }
}

/*eslint max-statements: 0*/