'use strict'

const searchField = 'ar'

const happyPath = {
  method: 'GET',
  url: `/profiles/search?searchField=${searchField}`,
  headers: {}
}

const notFound = {
  method: 'GET',
  url: '/profiles/search?searchField=foundNoOne',
  headers: {}
}

module.exports = {
  searchField,
  happyPath,
  notFound
}