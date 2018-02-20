'use strict'

const sessionManager = require('../../managers/sessionManager')

module.exports = (app) => {
  const logout = (payload, headers) => {
    const dictionary = app.coincidents.Translate.gate.selectLanguage(headers.language)
    
    return sessionManager.destroySession(headers, dictionary)
      .then((sessionDeleted) => _buildResponse(sessionDeleted))
  }

  const _buildResponse = (sessionDeleted) => ({
    logout: sessionDeleted
  })

  return {
    logout
  }
}