'use strict'

const happyPathWithUserRef = {
  method: 'GET',
  url: '/profiles/getProfile?userRef=591df6c78d1fdc0bb4eba371',
  headers: {}
}

const happyPathWithUserName = {
  method: 'GET',
  url: '/profiles/getProfile?userName=sergioRamos',
  headers: {}
}

const happyPathWithSelf = {
  method: 'GET',
  url: '/profiles/getProfile?self=true',
  headers: {}
}

const notFound = {
  method: 'GET',
  url: '/profiles/getProfile?userRef=591df6c78d1fdc0bb4ebaaaa',
  headers: {}
}

module.exports = {
  happyPathWithUserRef,
  happyPathWithUserName,
  happyPathWithSelf,
  notFound
}