'use strict'

const generateStringRandomly = (stringSize) => {
  let text = ''
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let interator = 0; interator < stringSize; interator++) {
    text += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length))
  }

  return text
}

module.exports = generateStringRandomly