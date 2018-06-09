const coincidents = require('iguess-api-coincidents')
const coincidentsConfig = coincidents.Config

const personalConfig = {
  gcp: {
    storageName: process.env.STORAGE_NAME || 'iguess-static-files',
    projectName: process.env.PROJECT_NAME || 'iguess-666666'
  },
  sendGrid: {
    apiKey: process.env.SENDGRID_API_KEY || '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',
    emailFrom: 'support@iguessteam.com'
  }
}

module.exports = Object.assign(coincidentsConfig, personalConfig)

/*eslint no-process-env: 0*/