'use Strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (app) => {
  const userErrors = app.src.utils.errorUtils.userErrors;

  const checkPasswordRestrict = (userData) =>
    new Promise((resolve, reject) => {
      const passwordRegex = new RegExp(/(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,25}/);
      if (passwordRegex.test(userData.password)) {
        resolve(userData)
      }

      reject(userErrors.passwordInvalid);
    })

  const cryptPassword = (userData) =>
    new Promise((resolve, reject) => {
      bcrypt.hash(userData.password, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        }
        userData.password = hash;

        resolve(userData);
      })
    })

  const checkPassword = (password, cryptedPassword) =>
    new Promise((resolve, reject) => {
      bcrypt.compare(password, cryptedPassword, (err, res) => {
        if (err) {
          reject(err);
        }

        resolve(res)
      })
    })

  return {
    checkPasswordRestrict,
    cryptPassword,
    checkPassword
  }
}