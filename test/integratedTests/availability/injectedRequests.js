const userNamehappyPathUnavailable = {
  method: 'GET',
  url: '/availability/userName?userName=sergioRamos',
  headers: {
    request_id: 'postmanRequest',
    hardware_fingerprint: 'postmanRequest',
    platform: 'Android',
    os_version: '7.0.1',
    app_version: '1.0.0',
    phone_model: 'XT-1792',
    phone_fabricator: 'Motorola'
  }
}

const userNamehappyPathAvailable = {
  method: 'GET',
  url: '/availability/userName?userName=naoExiste',
  headers: {
    request_id: 'postmanRequest',
    hardware_fingerprint: 'postmanRequest',
    platform: 'Android',
    os_version: '7.0.1',
    app_version: '1.0.0',
    phone_model: 'XT-1792',
    phone_fabricator: 'Motorola'
  }
}

const emailHappyPathUnavailable = {
  method: 'GET',
  url: '/availability/email?email=kross@madrid.com',
  headers: {
    request_id: 'postmanRequest',
    hardware_fingerprint: 'postmanRequest',
    platform: 'Android',
    os_version: '7.0.1',
    app_version: '1.0.0',
    phone_model: 'XT-1792',
    phone_fabricator: 'Motorola'
  }
}

const emailHappyPathAvailable = {
  method: 'GET',
  url: '/availability/email?email=kr8s@deutschland.com',
  headers: {
    request_id: 'postmanRequest',
    hardware_fingerprint: 'postmanRequest',
    platform: 'Android',
    os_version: '7.0.1',
    app_version: '1.0.0',
    phone_model: 'XT-1792',
    phone_fabricator: 'Motorola'
  }
}

const notEmail = {
  method: 'GET',
  url: '/availability/email?email=kr8s@deutschland',
  headers: {
    request_id: 'postmanRequest',
    hardware_fingerprint: 'postmanRequest',
    platform: 'Android',
    os_version: '7.0.1',
    app_version: '1.0.0',
    phone_model: 'XT-1792',
    phone_fabricator: 'Motorola'
  }
}

module.exports = {
  userNamehappyPathAvailable,
  userNamehappyPathUnavailable,
  emailHappyPathUnavailable,
  emailHappyPathAvailable,
  notEmail
}

/*eslint camelcase:0 */