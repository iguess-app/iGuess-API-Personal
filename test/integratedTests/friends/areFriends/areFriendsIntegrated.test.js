'use strict'

const Joi = require('joi')
const Lab = require('lab')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/friends/').areFriendsSchemas.response

const lab = exports.lab = Lab.script()
const expect = Lab.expect

lab.experiment('Integrated Test ==> Are Friends', () => {

  lab.test('[IO] Are Friends - happyPath', (done) => {
    server.inject(injectedRequests.happyPathFriends)
      .then((response) => {
        const result = response.result
        expect(result.areFriends).to.be.equal(true)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('[IO] Are Friends - happyPath', (done) => {
    server.inject(injectedRequests.happyPathNotFriends)
      .then((response) => {
        const result = response.result
        expect(result.areFriends).to.be.equal(false)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })
})