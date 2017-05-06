'use Strict';

module.exports = (app) => {
  const profileInfoRepository = app.src.repositories.profileUpdates.profileInfoRepository;

  const updateInfo = (payload, headers) => 
    profileInfoRepository.updateInfo(payload, headers)

  return {
    updateInfo
  }
}