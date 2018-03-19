const coincidents = require('iguess-api-coincidents')
const coincidentsConfig = coincidents.Config

const personalConfig = {
  gcp: {
    storageName: process.env.STORAGE_NAME || 'iguess-static-files',
    projectName: process.env.PROJECT_NAME || 'iguess-666666'
  }
}

module.exports = Object.assign(coincidentsConfig, personalConfig)

/*eslint no-process-env: 0*/