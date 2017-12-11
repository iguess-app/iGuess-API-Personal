'use strict'

const happyPath = {
  method: 'GET',
  url: '/friends/list',
  headers: {
    request_id: 'integratedTest',
    hardware_fingerprint: 'integratedTest',
    platform: 'Android',
    os_version: '7.0.1',
    app_version: '1.0.0',
    phone_model: 'XT-1792',
    phone_fabricator: 'Motorola'
  }
}

module.exports = {
  happyPath
}

/*eslint camelcase:0 */