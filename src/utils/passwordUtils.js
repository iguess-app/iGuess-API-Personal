'use Strict';

const bcrypt = require('bcrypt');

module.exports = (app) => {
  const userErrors = app.src.utils.errorUtils.userErrors;
  const config = app.src.config;

  const checkPasswordRestrict = (userData) =>
    new Promise((resolve, reject) => {
      const passwordRegex = new RegExp(/(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,25}/);
      if (passwordRegex.test(userData.password)) {
        resolve(userData)
      }
      resolve(userData)
      reject(userErrors.passwordInvalid);
    })

  const cryptPassword = (userData) =>
    bcrypt.hash(userData.password, config.salt)
      .then((hash) => {
        userData.password = hash;
        
        return userData;
      })
      .catch((err) => err)

  const checkPassword = (password, cryptedPassword) =>
      bcrypt.compare(password, cryptedPassword)
        .then((res) => res)
        .catch((err) => err)

  return {
    checkPasswordRestrict,
    cryptPassword,
    checkPassword
  }
}