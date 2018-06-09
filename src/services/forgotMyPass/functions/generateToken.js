'use strict'

const coincidents = require('iguess-api-coincidents')
const commonData = require('../commonData')
const cacheManager = coincidents.Managers.cacheManager

const carte = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'S', 'R', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const generateToken = async () => {
  const charsLength = carte.length
  let token = ''
  for (let counter = 0; counter !== commonData.TOKEN_SIZE; counter++) {
    token += carte[Math.floor(Math.random() * charsLength)]
  }

  const tokenAlreadyExists = await cacheManager.get(commonData.REDIS_PREFIX_KEY+token)
  
  if (tokenAlreadyExists) {
    return generateToken()
  }

  return token
}

module.exports = () => generateToken

/*eslint no-plusplus: 0*/