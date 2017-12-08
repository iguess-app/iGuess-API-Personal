'use strict'

const Joi = require('joi')
const Lab = require('lab')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/teams/').listLeaguesSchema.response
const getTokenWithSignInBeforeTests = require('../../lib/getTokenWithSignInBeforeTests').getTokenWithSignInBeforeTests

const lab = exports.lab = Lab.script()
const expect = Lab.expect
let token = ''

lab.experiment('Integrated Test ==> Get Teams', () => {

  lab.before((done) => {
    getTokenWithSignInBeforeTests()
      .then((tokenResponse) => {
        token = tokenResponse
        done()
      })
  })

  lab.test('[MONGO] [REDIS] Get Teams - list Leagues', (done) => {
    injectedRequests.happyPath.headers.token = token
    server.inject(injectedRequests.happyPath)
      .then((response) => {
        const result = response.result
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

})