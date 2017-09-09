'use Strict';

module.exports = (app) => {
  const Profile = app.src.models.profileModel;

  const emailAvailability = (request) => _checkIfEmailExists(request.email)

  const _checkIfEmailExists = (email) => {

    const searchQuery = {
      email
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
    emailAvailability
  }
}