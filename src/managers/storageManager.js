'use strict'

//const fs = require('fs')
const storage = require('@google-cloud/storage')

const config = require('../../config')

const CLOUD_BUCKET = config.gcp.storageName

const iguessStorage = storage({
  projectId: config.gcp.projectName
})

const bucket = iguessStorage.bucket(CLOUD_BUCKET)


const getPublicUrl = (filename) => `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`

const sendUploadToGCS = (user) => {
  const gcsname = Date.now() + user.userRef
  const file = bucket.file(gcsname)

  //user.avatarFile = user.avatarFile.replace('data:image/jpeg;base64,/', '')

  const bitmap = new Buffer(user.avatarFile, 'base64')

  //fs.writeFileSync('./xablau.jpeg', user.avatarFile, 'base64')

  const stream = file.createWriteStream({
    metadata: {
      contentType: bitmap
    }
  })

  return new Promise((resolve, reject) => {
    stream.on('error', (err) => {
      reject(err)
    })

    stream.on('finish', () => {
      file.makePublic()
        .then(() => resolve(getPublicUrl(gcsname)))
    })
  })


  //stream.end(req.file.buffer)
}

module.exports = {
  getPublicUrl,
  sendUploadToGCS
};