"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _winston = _interopRequireDefault(require("./config/winston"));
var _home = _interopRequireDefault(require("./domains/home/home.router"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Impornting winston logger

// Importando enrutador home

// Función que agrega rutas
const addRoutes = app => {
  // Agregando enrutado de Home
  app.use('/', _home.default);

  // ERRORES
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
  return app;
};
var _default = exports.default = {
  addRoutes
};