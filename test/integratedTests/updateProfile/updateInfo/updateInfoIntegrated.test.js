'use strict'

const Joi = require('joi')
const Lab = require('lab')
const coincidents = require('iguess-api-coincidents')

const injectedRequests = require('./injectedRequests')
const server = require('../../../../app').configServer
const schemaValidate = require('../../../../src/routes/schemas/updateProfile').updateInfoSchemas.response
const generateString = require('./lib/generateString')
const signInProfileUpdateBeforeTests = require('../../lib/getTokenWithSignInBeforeTests').signInProfileUpdateBeforeTests

const { errorCode } = coincidents.Utils
const lab = exports.lab = Lab.script()
const expect = Lab.expect
const dictionary = coincidents.Translate.gate.selectLanguage()
const statusCode = coincidents.Utils.statusUtils
const profileRules = coincidents.Config.profile
let token = ''

lab.experiment('Integrated Test ==> Update Info Profile', () => {

  lab.before((done) => {
    signInProfileUpdateBeforeTests()
      .then((tokenResponse) => {
        token = tokenResponse
        done()
      })
  })

  lab.test('[MONGO] [REDIS] Update Info Profile - update Name', (done) => {
    injectedRequests.updateName.payload.name = generateString(profileRules.userNameMinSize)
    injectedRequests.updateName.headers.token = token
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

  lab.test('[MONGO] [REDIS] Update Info Profile - update Description', (done) => {
    injectedRequests.updateDescription.payload.description = generateString(profileRules.descriptionMaxSize)
    injectedRequests.updateDescription.headers.token = token
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

  lab.test('[MONGO] [REDIS] Update Info Profile - update Email', (done) => {
    injectedRequests.updateEmail.payload.email = `${generateString(4)}@gmail.com`
    injectedRequests.updateEmail.headers.token = token
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

  lab.test('[REDIS] Update Info Profile - too short Name', (done) => {
    injectedRequests.updateName.payload.name = generateString(profileRules.nameMinSize - 1)
    injectedRequests.updateName.headers.token = token    
    server.inject(injectedRequests.updateName)
      .then((response) => {
        expect(response.statusCode).to.be.equal(statusCode.badRequest)
        done()
      })
  })

  lab.test('[REDIS] Update Info Profile - too long Name', (done) => {
    injectedRequests.updateName.payload.name = generateString(profileRules.nameMaxSize + 1)
    injectedRequests.updateName.headers.token = token    
    server.inject(injectedRequests.updateName)
      .then((response) => {
        expect(response.statusCode).to.be.equal(statusCode.badRequest)
        done()
      })
  })

  lab.test('[REDIS] Update Info Profile - too short userName', (done) => {
    injectedRequests.updateUserName.payload.userName = generateString(profileRules.userNameMinSize - 1)
    injectedRequests.updateUserName.headers.token = token    
    server.inject(injectedRequests.updateUserName)
      .then((response) => {
        expect(response.statusCode).to.be.equal(statusCode.badRequest)
        done()
      })
  })

  lab.test('[REDIS] Update Info Profile - too long userName', (done) => {
    injectedRequests.tooLongUserName.headers.token = token        
    server.inject(injectedRequests.tooLongUserName)
      .then((response) => {
        expect(response.statusCode).to.be.equal(statusCode.badRequest)
        done()
      })
  })

  lab.test('[REDIS] Update Info Profile - too long Description', (done) => {
    injectedRequests.updateDescription.payload.description = generateString(profileRules.descriptionMaxSize + 1)
    injectedRequests.updateDescription.headers.token = token            
    server.inject(injectedRequests.updateDescription)
      .then((response) => {
        const result = response.result
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        expect(result.message).to.be.equal(dictionary.tooLongDescription)
        expect(result.errorCode).to.be.equal(errorCode.tooLongDescription)
        done()
      })
  })

  lab.test('[REDIS] Update Info Profile - not Valid Email', (done) => {
    injectedRequests.invalidEmail.headers.token = token                
    server.inject(injectedRequests.invalidEmail)
      .then((response) => {
        const result = response.result
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        expect(result.message).to.be.equal(dictionary.notAEmail)
        expect(result.errorCode).to.be.equal(errorCode.notAEmail)
        done()
      })
  })

  lab.test('[MONGO] [REDIS] Update Info Profile - userName Alredy In Use', (done) => {
    injectedRequests.userNameAlredyInUse.headers.token = token                    
    server.inject(injectedRequests.userNameAlredyInUse)
      .then((response) => {
        const result = response.result
        expect(response.statusCode).to.be.equal(statusCode.notAcceptable)
        expect(result.message).to.be.equal(dictionary.userNameAlreadyUsed)
        expect(result.errorCode).to.be.equal(errorCode.userNameAlreadyUsed)
        done()
      })
  })

})

/*eslint max-statements: 0*/
/*eslint no-magic-numbers: 0*/