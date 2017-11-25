'use strict'

const searchField = 'ar'

const happyPath = {
  method: 'GET',
  url: `/profiles/search?searchField=${searchField}`
}

const notFound = {
  method: 'GET',
  url: '/profiles/search?searchField=foundNoOne'
}

module.exports = {
  searchField,
  happyPath,
  notFound
}