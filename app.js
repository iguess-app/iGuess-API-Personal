'use strict';

const consign = require('consign');
const app = {};
app.coincidents = require('iguess-api-coincidents');

consign()
  .include('configServer.js')
  .include('src/repositories')
  .include('src/services')
  .include('src/controllers')
  .include('src/routes')
  .into(app);

app.configServer.start((err) => {
  if (err) {
    throw err;
  }

  console.log(`Server running at ${app.configServer.info.uri}`);
})