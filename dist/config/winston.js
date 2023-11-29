"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _winston = _interopRequireWildcard(require("winston"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Se desestructuran funciones para realizar la
// composición del formato
const {
  combine,
  timestamp,
  label,
  printf,
  colorize,
  prettyPrint
} = _winston.format;

// Creando variable del directorio raiz
// eslint-disable-next-line
global['__rootdir'] = _path.default.resolve(process.cwd());

// Se define un esquema de colores
// segun el grado de severidad
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue'
};

// Agregando el esquema de colores a Winston
_winston.default.addColors(colors);

// ==== Se crean las plantillas para los formatos ====

// Formato para la consola
const myConsoleFormat = combine(
// Agregando colores la formato
colorize({
  all: true
}),
// Agregando una etiqueta al log
label({
  label: '📣'
}),
// Agregando Fecha
timestamp({
  format: 'DD-MM-YYYY HH:mm:ss'
}),
// Función de impreson
printf(info => `${info.level}: ${info.label}: ${info.timestamp}: ${info.message}`));

// Formato para los archivos
const myFileFormat = combine(
// Quitando todo tipo de colorizacion
_winston.format.uncolorize(),
// Agregando fecha
timestamp({
  format: 'DD-MM-YYYY HH:mm:ss'
}),
// Estableciendo la salida en formato Json
prettyPrint());

// Creando el objeto de opciones para cada transporte
const options = {
  infoFile: {
    level: 'info',
    filename: `${__rootdir}/server/logs/info.log`,
    handleExceptions: false,
    maxSize: 5242880,
    // 5MB
    maxFiles: 5,
    format: myFileFormat
  },
  warnFile: {
    level: 'info',
    filename: `${__rootdir}/server/logs/warn.log`,
    handleExceptions: false,
    maxSize: 5242880,
    // 5MB
    maxFiles: 5,
    format: myFileFormat
  },
  errorFile: {
    level: 'error',
    filename: `${__rootdir}/server/logs/error.log`,
    handleExceptions: false,
    maxSize: 5242880,
    // 5MB
    maxFiles: 5,
    format: myFileFormat
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: myConsoleFormat
  }
};

// Se crea instancia de logger
const logger = _winston.default.createLogger({
  transports: [new _winston.default.transports.File(options.infoFile), new _winston.default.transports.File(options.warnFile), new _winston.default.transports.File(options.errorFile), new _winston.default.transports.Console(options.console)],
  exitOnError: false // No finaliza en excepciones no manejadas
});

/*
Por defecto Morgan envía la salida exclusivamente a la consola, algo asi:
 Morgan --->[logs]---> consola
Lo que haremos a continuación sera definir una función llamada "write" que será parte de un objeto que se asignará a la propiedad stream del logger, esta función será capaz de recibir la salida que genera Morgan "message" y redirigirla a winston como informativa
Usaremos el nivel informativo para que tanto el transportador archivo como el de consola tomen el 
Morgan --->[logs]---> Winston ---> [Logs a transportes informativos]
*/

// Estableciendo un flujo de entrada que servira
// para interceptar el log de morgan
logger.stream = {
  write(message) {
    logger.info(message);
  }
};

// Por ultimo exportamos el logger
var _default = exports.default = logger;