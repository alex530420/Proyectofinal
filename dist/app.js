"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _morgan = _interopRequireDefault(require("morgan"));
var _webpack = _interopRequireDefault(require("webpack"));
var _webpackDevMiddleware = _interopRequireDefault(require("webpack-dev-middleware"));
var _webpackHotMiddleware = _interopRequireDefault(require("webpack-hot-middleware"));
var _webpackDev = _interopRequireDefault(require("../webpack.dev.config"));
var _winston = _interopRequireDefault(require("./config/winston"));
var _index = _interopRequireDefault(require("./routes/index"));
var _users = _interopRequireDefault(require("./routes/users"));
var _debugLogger = _interopRequireDefault(require("./services/debugLogger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Cargando dependencias

// Setting Webpack Modules

// Importing webpack configuration

// Impornting winston logger

// var debug = require('debug')('dwpcii:server');

// Creando variable del directorio raiz
// eslint-disable-next-line
global["__rootdir"] = _path.default.resolve(process.cwd());

// Creando la instancia de express
const app = (0, _express.default)();

// Get the execution mode
const nodeEnviroment = process.env.NODE_ENV || 'production';

// Deciding if we add webpack middleware or not
if (nodeEnviroment === 'development') {
  // Start Webpack dev server
  (0, _debugLogger.default)('🛠️ Ejecutando en modo desarrollo 🛠️');
  // Adding the key "mode" with its value "development"
  _webpackDev.default.mode = nodeEnviroment;
  // Setting the dev server port to the same value as the express server
  _webpackDev.default.devServer.port = process.env.PORT;
  // Setting up the HMR (Hot Module Replacement)
  _webpackDev.default.entry = ['webpack-hot-middleware/client?reload=true&timeout=1000', _webpackDev.default.entry];
  // Agregar el plugin a la configuración de desarrollo
  // de webpack
  _webpackDev.default.plugins.push(new _webpack.default.HotModuleReplacementPlugin());
  // Creating the bundler
  const bundle = (0, _webpack.default)(_webpackDev.default);
  // Enabling the webpack middleware
  app.use((0, _webpackDevMiddleware.default)(bundle, {
    publicPath: _webpackDev.default.output.publicPath
  }));
  //  Enabling the webpack HMR
  app.use((0, _webpackHotMiddleware.default)(bundle));
} else {
  console.log('🏭 Ejecutando en modo producción 🏭');
}

// Configurando el motor de plantillas
app.set('views', _path.default.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Se establecen los middlewares
app.use((0, _morgan.default)('dev', {
  stream: _winston.default.stream
}));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());
// Crea un server de archivos estaticos
app.use(_express.default.static(_path.default.join(__dirname, '..', 'public')));

// Registro de Middlewares de aplicación
app.use('/', _index.default);
// Activa "usersRourter" cuando se
// solicita "/users"
app.use('/users', _users.default);
// app.use('/author', (req, res)=>{
//   res.json({mainDeveloper: "Ivan Rivalcoba"})
// });

// catch 404 and forward to error handler
app.use((req, res, next) => {
  _winston.default.info(`404 Pagina no encontrada ${req.method} ${req.originalUrl}`);
  next((0, _httpErrors.default)(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  _winston.default.error(`${err.status || 500} - ${err.message}`);
  res.render('error');
});
var _default = exports.default = app;