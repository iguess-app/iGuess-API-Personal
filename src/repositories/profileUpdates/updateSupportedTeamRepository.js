'use Strict';

const Boom = require('boom')

module.exports = (app) => {
  const Profile = app.coincidents.Schemas.profileSchema;
  const Team = app.coincidents.Schemas.teamSchema;

  const updateSupportedTeam = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);

    return Team.findById(payload.supportedTeamId)
      .then((teamChosen) => {
        if (!teamChosen) {
          Boom.notFound(dictionary.teamNotFound)
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
            if (footballSupportedTeams.supportedTeam && footballSupportedTeams.supportedTeam.teamId === teamChosen.id) {
              return responseObj;
            }
            userFound.footballSupportedTeams.supportedTeam = {
              teamId: teamChosen.id,
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