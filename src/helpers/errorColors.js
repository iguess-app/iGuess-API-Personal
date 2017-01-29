const colors = require('colors');
colors.setTheme({
  data: 'grey',
  debug: 'blue',
  error: 'red',
  help: 'cyan',
  info: 'green',
  input: 'grey',
  prompt: 'grey',
  silly: 'rainbow',
  verbose: 'cyan',
  warn: 'yellow'
})

module.exports = colors;