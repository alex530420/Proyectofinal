#!/usr/bin/env node

/**
 * Module dependencies.
 */
// Importing the server logic
// require is used to import code from an external file
// Importing an external dependecy
// Module that allows to communicate with a client
// usign HTTP protocol
"use strict";

var _http = _interopRequireDefault(require("http"));
var _app = _interopRequireDefault(require("../app"));
var _winston = _interopRequireDefault(require("../config/winston"));
var _configKeys = _interopRequireDefault(require("../config/configKeys"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Impornting winston logger
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(_configKeys.default.PORT);
// Store the port info in the app
_app.default.set('port', port);

/**
 * Create HTTP server.
 */
_winston.default.info('The server is created from the express instance');
const server = _http.default.createServer(_app.default); // (req, res) => { acciones }

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      _winston.default.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      _winston.default.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  _winston.default.info(`⭐⭐ Listening on ${process.env.APP_URL}:${addr.port} ⭐⭐`);
}

/**
 * Listen on provided port, on all network interfaces.
 */
// Specifying the port where the server will be listening
server.listen(port);
// Attaching Callbacks to events
server.on('error', onError);
server.on('listening', onListening);