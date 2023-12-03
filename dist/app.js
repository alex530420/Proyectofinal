"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _morgan = _interopRequireDefault(require("morgan"));
var _webpack = _interopRequireDefault(require("webpack"));
var _webpackDevMiddleware = _interopRequireDefault(require("webpack-dev-middleware"));
var _webpackHotMiddleware = _interopRequireDefault(require("webpack-hot-middleware"));
var _templateEngine = _interopRequireDefault(require("./config/templateEngine"));
var _webpackDev = _interopRequireDefault(require("../webpack.dev.config"));
var _winston = _interopRequireDefault(require("./config/winston"));
var _router = _interopRequireDefault(require("./router"));
var _debugLogger = _interopRequireDefault(require("./services/debugLogger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Cargando dependencias

// Setting Webpack Modules

// Importing template-engine

// Importing webpack configuration

// Impornting winston logger

// Importing Router

// Creando variable del directorio raiz
// eslint-disable-next-line
global['__rootdir'] = _path.default.resolve(process.cwd());

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

// Configuring the template engine
(0, _templateEngine.default)(app);

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

// Registro de Rutas
_router.default.addRoutes(app);
var _default = exports.default = app;