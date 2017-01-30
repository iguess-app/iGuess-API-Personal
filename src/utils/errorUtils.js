'use Strict';

module.exports = () => {
  const mongoErrors = {
    _idAlreadyUsed: 11000
  }

  const userErrors = {
    passwordInvalid: {
      code: 20000
    }
  }

  return {
    mongoErrors,
    userErrors
  }
}