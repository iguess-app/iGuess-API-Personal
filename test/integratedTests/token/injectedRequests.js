'use strict'

const happyPath = {
  method: 'GET',
  url: '/token/verify',
  headers: {
    request_id: 'integratedTest',
    hardware_fingerprint: 'integratedTest',
    platform: 'Android',
    os_version: '7.0.1',
    app_version: '1.0.0',
    phone_model: 'XT-1792',
    phone_fabricator: 'Motorola',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWxpZCI6dHJ1ZSwiaWF0IjoxNTExNTYyODA0LCJleHAiOjE1MTE1NjY0MDR9.mG6xWgCi085fZXgC8J80sweX_2ZaOlTRL5RUMwjAlBY'
  }
}

module.exports = {
  happyPath
}

/*eslint camelcase:0 */