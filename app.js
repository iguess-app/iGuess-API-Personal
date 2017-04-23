'use strict';

const Hapi = require('hapi');
const Bell = require('bell');
const HapiEnding = require('hapi-ending');
const consign = require('consign');
const app = {};

consign()
  .include('src/config.js')
  .include('src/utils')
  .include('src/managers')
  .include('src/translate')
  .include('src/schemas')
  .include('src/application/repositories')
  .include('src/application/services')
  .include('src/application/controllers')
  .include('src/application/routes')
  .include('test/unitTests')
  .include('test/integratedTests')
  .into(app);

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 9002
});

const HapiEndingConfig = {
  register: HapiEnding,
  options: {
    baseUrl: server.uri,
    enabled: true,
    assetsPath: 'documentation'
  }
}

server.register([Bell, HapiEndingConfig], (err) => {

  if (err) {
    throw err;
  }

  server.auth.strategy('facebook', 'bell', {
    provider: 'facebook',
    password: 'cookie_encryption_password_secure',
    isSecure: false,
    clientId: '1839068873039445',
    clientSecret: '4bea584f60c0cf37b5b037b1c4bc8590',
    location: server.info.uri
  });

  app.src.config.routes.map((route) => server.route(route))

  server.start((errr) => {
    if (errr) {
      throw errr;
    }

    console.log(`Server running at ${server.uri}`);
  })

})