'use Strict';

module.exports = (app) => {
  const signInRepository = app.src.repositories.login.signInRepository;

  const singIn = (query, headers) => signInRepository.singIn(query, headers)

  return {
    singIn
  }
};