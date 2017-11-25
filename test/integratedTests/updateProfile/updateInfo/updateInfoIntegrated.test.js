'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/updateProfile').updateInfoSchemas.response
const generateString = require('./lib/generateString')

const lab = exports.lab = Lab.script()
const expect = Lab.expect
const dictionary = coincidents.Translate.gate.selectLanguage()
const statusCode = coincidents.Utils.statusUtils

lab.experiment('Integrated Test ==> Update Info Profile', () => {

  lab.test('[IO] Update Info Profile - update Name', (done) => {
    injectedRequests.updateName.payload.name = generateString(8)
    server.inject(injectedRequests.updateName)
      .then((response) => {
        const result = response.result
        expect(result.profileModified).to.be.equal(true)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('[IO] Update Info Profile - update Description', (done) => {
    injectedRequests.updateDescription.payload.description = generateString(20)
    server.inject(injectedRequests.updateDescription)
      .then((response) => {
        const result = response.result
        expect(result.profileModified).to.be.equal(true)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('[IO] Update Info Profile - update Email', (done) => {
    injectedRequests.updateEmail.payload.email = `${generateString(4)}@gmail.com`
    server.inject(injectedRequests.updateEmail)
      .then((response) => {
        const result = response.result
        expect(result.profileModified).to.be.equal(true)
        Joi.validate(result, schemaValidate, (err) => {
          expect(err).to.be.equal(null)
          done()
        })
      })
  })

  lab.test('Update Info Profile - too long Name', (done) => {
    injectedRequests.updateName.payload.name = generateString(21)
    server.inject(injectedRequests.updateName)
      .then((response) => {
        const result = response.result
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        expect(result.message).to.be.equal(dictionary.tooLongName)
        done()
      })
  })

  lab.test('Update Info Profile - too long userName', (done) => {
    server.inject(injectedRequests.tooLongUserName)
      .then((response) => {
        const result = response.result
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        expect(result.message).to.be.equal(dictionary.tooLongUserName)
        done()
      })
  })

  lab.test('Update Info Profile - too long Description', (done) => {
    injectedRequests.updateDescription.payload.description = generateString(101)
    server.inject(injectedRequests.updateDescription)
      .then((response) => {
        const result = response.result
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        expect(result.message).to.be.equal(dictionary.tooLongDescription)
        done()
      })
  })

  lab.test('Update Info Profile - not Valid Email', (done) => {
    server.inject(injectedRequests.invalidEmail)
      .then((response) => {
        const result = response.result
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        expect(result.message).to.be.equal(dictionary.notAEmail)
        done()
      })
  })

  lab.test('[IO] Update Info Profile - userName Alredy In Use', (done) => {
    server.inject(injectedRequests.userNameAlredyInUse)
      .then((response) => {
        const result = response.result
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        expect(result.message).to.be.equal(dictionary.userNameAlreadyUsed)
        done()
      })
  })

})