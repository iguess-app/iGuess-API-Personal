'use Strict';

module.exports = (app) => {
  const TokenManager = app.coincidents.Managers.tokenManager;

  const verify = (data) => TokenManager.isValid(data.token)
    .then((tokenValid) => {
      Reflect.deleteProperty(tokenValid, 'exp');
      Reflect.deleteProperty(tokenValid, 'iat');

      return tokenValid
    })
    .catch(() => ({
      valid: false
    }))


  return {
    verify
  }
}