'use Strict';

module.exports = (app) => {
  const undoFriendShipRepository = app.src.repositories.friends.undoFriendShipRepository;

  const undoFriendship = (request, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language);

    return undoFriendShipRepository.undoFriendship(request, dictionary)
  }

  return {
    undoFriendship
  }
}