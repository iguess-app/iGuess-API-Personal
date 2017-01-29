'use strict';

const Hapi = require('hapi');

module.exports = () => {
  const server = new Hapi.Server();
  server.connection({
    host: 'localhost',
    port: 9002
  });

  return server;
}