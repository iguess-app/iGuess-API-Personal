'use Strict';

module.exports = (app) => {
  const tokenRepository = app.src.repositories.tokenRepository;

  const verify = (payload) => tokenRepository.verify(payload)

  return {
    verify
  }
};