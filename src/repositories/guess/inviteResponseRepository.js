'use strict'

const Boom = require('boom')
const coincidents = require('iguess-api-coincidents')

const requestManager = coincidents.Managers.requestManager
const apis = coincidents.Config.apis

const inviteReponse = (request, headers = {}) => {
  const uri = `${apis.guessUrl}/guessleague/inviteResponse`

  return requestManager.patch(uri, headers, request)
    .catch((err) => 
      Boom.create(err.error.statusCode, err.error.message, err)
    )
}

module.exports = {
  inviteReponse
}

/*ReadMe:
  Escolhemos 'return' Boom ao invés de 'throw' Boom pois existe as possibilidades da GuessLeague não existir mais ou 
  do usuário que convidou não ser mais capitão ou não fazer mais parte da liga, nesses casos. 
  Deletaremos a notificação do usuário da mesma forma. Por isso o return e nao o throw
*/