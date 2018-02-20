'use strict'

const headers = {
  request_id: 'integratedTest',
  hardware_fingerprint: 'integratedTest',
  platform: 'Android',
  os_version: '7.0.1',
  app_version: '1.0.0',
  phone_model: 'XT-1792',
  phone_fabricator: 'Motorola',
  token: 'SET DYNAMICALLY'
}

const login = {
  method: 'DELETE',
  url: '/login/logout',
  headers
}

module.exports = {
  login
}

/*eslint camelcase:0 */