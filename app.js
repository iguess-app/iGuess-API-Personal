'use strict';

const Hapi = require('hapi');
const consign = require('consign');

const app = {};
app.coincidents = require('./IGuess-API-Coincidents/app');

consign()
  .include('src/repositories')
  .include('src/services')
  .include('src/controllers')
  .include('src/routes')
  .into(app);

const server = new Hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: 8080
});

app.coincidents.Config.routes.map((route) => server.route(route))

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply('Iguess - Personal API');
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }

  console.log(`Server running at ${server.info.uri}`);
})