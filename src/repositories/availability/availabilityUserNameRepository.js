'use Strict';

module.exports = (app) => {
  const Profile = app.coincidents.Schemas.profileSchema;

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