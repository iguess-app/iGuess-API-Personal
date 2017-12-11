'use strict'

const headers = {
  request_id: 'postmanRequest',
  hardware_fingerprint: 'postmanRequest',
  platform: 'Android',
  os_version: '7.0.1',
  app_version: '1.0.0',
  phone_model: 'XT-1792',
  phone_fabricator: 'Motorola'
}

const searchField = 'ar'

const happyPath = {
  method: 'GET',
  url: `/profiles/search?searchField=${searchField}`,
  headers
}

const notFound = {
  method: 'GET',
  url: '/profiles/search?searchField=foundNoOne',
  headers
}

module.exports = {
  searchField,
  happyPath,
  notFound
}

/*eslint camelcase:0 */