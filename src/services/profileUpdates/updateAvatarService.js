//const CLOUD_BUCKET = config.get('CLOUD_BUCKET')

//const storage = Storage({
//projectId: config.get('GCLOUD_PROJECT')
//})
//const bucket = storage.bucket(CLOUD_BUCKET)

//https://github.com/GoogleCloudPlatform/nodejs-getting-started/blob/master/3-binary-data/lib/images.js


'use strict'


const sessionManager = require('../../managers/sessionManager')
const storageManager = require('../../managers/storageManager')


module.exports = (app) => {

  const updateAvatar = async (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    const session = await sessionManager.getSession(headers, dictionary)
    
    payload.userRef = session.userRef

    return storageManager.sendUploadToGCS(payload)
  }

  return {
    updateAvatar
  }
}