'use Strict';

const Promise = require('bluebird');
const Boom = require('Boom');

module.exports = (app) => {
  const PasswordUtils = app.src.utils.passwordUtils;
  const QueryUtils = app.src.utils.queryUtils;
  const TokenManager = app.src.managers.tokenManager;
  const Profile = app.src.schemas.profileSchema;

  const singIn = (data, header) => {

    const dictionary = app.src.translate.gate.selectLanguage(header.language);

    return _findByEmail(data.email, dictionary)
      .then((userFounded) => _singInJobs(data, userFounded, dictionary))
      .catch((err) => err)

  }

  const _singInJobs = (data, userFounded, dictionary) =>
    PasswordUtils.checkPassword(data.password, userFounded.password)
    .then((isMatched) => {
      if (isMatched) {
        const token = TokenManager.generate();
        const userFoundedWithOutPass = _removePasswordFromObject(userFounded);

        return {
          token,
          user: userFoundedWithOutPass
        }
      }

      throw Boom.unauthorized(dictionary.invalidLogin);
    })
    .catch((err) => Boom.unauthorized(err))

  const _removePasswordFromObject = (userFounded) => {
    Reflect.deleteProperty(userFounded, 'password');
    Reflect.set(userFounded, 'nickName', userFounded._id)

    return userFounded
  }

  const _findByEmail = (email, dictionary) =>
    Promise.resolve(Profile.findOne({
        email
      })
      .then((userFounded) => {
        if (userFounded) {
          return QueryUtils.makeObject(userFounded);
        }

        throw Boom.unauthorized(dictionary.invalidLogin);
      })
      .catch((err) => err)
    )


  return {
    singIn
  }
}