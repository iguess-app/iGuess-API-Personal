const userNamehappyPathUnavailable = {
  method: 'GET',
  url: '/availability/userName?userName=sergioRamos'
}

const userNamehappyPathAvailable = {
  method: 'GET',
  url: '/availability/userName?userName=naoExiste'
}

const emailHappyPathUnavailable = {
  method: 'GET',
  url: '/availability/email?email=kross@madrid.com'
}

const emailHappyPathAvailable = {
  method: 'GET',
  url: '/availability/email?email=kr8s@deutschland.com'
}

const notEmail = {
  method: 'GET',
  url: '/availability/email?email=kr8s@deutschland'
}

module.exports = {
  userNamehappyPathAvailable,
  userNamehappyPathUnavailable,
  emailHappyPathUnavailable,
  emailHappyPathAvailable,
  notEmail
}