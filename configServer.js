'use strict';

const Hapi = require('hapi');
const PORT_LOCAL = 9002;
let port = 8080;

module.exports = (app) => {
  const config = app.coincidents.Config;

  if (config.env === 'local') {
    port = PORT_LOCAL;
  }

  const server = new Hapi.Server();
  server.connection({
    host: '0.0.0.0',
    port
  });

  return server;
}