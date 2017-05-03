'use strict';

const Hapi = require('hapi');

module.exports = () => {
  const server = new Hapi.Server();
  server.connection({
    host: '0.0.0.0',
    port: 8080
  });

  return server;
}