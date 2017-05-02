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
  host: 'localhost',
  port: 9002
});


app.coincidents.Config.routes.map((route) => server.route(route))

server.start((errr) => {
  if (errr) {
    throw errr;
  }

  console.log(`Server running at ${server.info.uri}`);
})