'use strict'

module.exports = (app) => {
  const Profile = app.src.models.profileModel;

  const userNameAvailability = (request) => _checkIfUserExists(request.userName)

  const _checkIfUserExists = (userName) => {

    const searchQuery = {
      userName
    }

    return Profile.findOne(searchQuery)
      .then((userFound) => {
        let available = true;
        if (userFound) {
          available = false;
        }

        return {
          available
        };
      })
      .catch((err) =>
        err
      )
  }


  return {
    userNameAvailability
  }
}