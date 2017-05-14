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
        const updateQuery = {
          '$set': {
            supportedTeam: {
              id: teamChosen.id,
              fullName: teamChosen.fullName,
              shortName: teamChosen.shortName,
              logo: teamChosen.logo,
              league: teamChosen.league
            }
          }
        }
        const optionsQuery = {
          runValidators: true
        }

        return Profile.update(searchQuery, updateQuery, optionsQuery)
          .then((queryResult) => {
            let modified = false;
            if (queryResult.nModified) {
              modified = true;
            }

            return {
              profileModified: modified
            };
          })
      })

  }

  return {
    updateSupportedTeam
  }
}