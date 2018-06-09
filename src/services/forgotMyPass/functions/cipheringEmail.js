'use strict'

const PREFIX_NOT_CIPHERED_ON_PROVIDER_PART = 2
const PREFIX_NOT_CIPHERED_ON_PERSONAL_PART = 2

const cipheringEmail = (email) => {
  const personalPart = email.split('@')[0]
  const providerPart = email.split('@')[1]
  let cipheredEmail = personalPart[0] + personalPart[1]

  const asteriskQuantity = personalPart.length - PREFIX_NOT_CIPHERED_ON_PERSONAL_PART
  for (let counter = 0; counter !== asteriskQuantity; counter++) {
    cipheredEmail = `${cipheredEmail}*`
  }

  cipheredEmail = `${cipheredEmail}@${providerPart[0]}${providerPart[1]}`

  const asteriskQuantityProvider = providerPart.length - PREFIX_NOT_CIPHERED_ON_PROVIDER_PART
  for (let counter = 0; counter !== asteriskQuantityProvider; counter++) {
    if (providerPart[counter + PREFIX_NOT_CIPHERED_ON_PROVIDER_PART] === '.') {
      cipheredEmail = `${cipheredEmail}.`
    } else {
      cipheredEmail = `${cipheredEmail}*`
    }
  }

  return cipheredEmail
}

module.exports = () => cipheringEmail

/*eslint max-statements: 0*/
/*eslint no-plusplus: 0*/
/*eslint no-magic-numbers: 0*/