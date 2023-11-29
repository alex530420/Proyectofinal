"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _home = _interopRequireDefault(require("./domains/home/home.router"));
var _user = _interopRequireDefault(require("./domains/user/user.router"));
var _project = _interopRequireDefault(require("./domains/project/project.router"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Importando enrutador home

// Importando enrutador user

// Imporntado enrutador project

// Función que agrega rutas
const addRoutes = app => {
  // Agregando el enrutador de home
  app.use('/', _home.default);
  // Agregado el enrutado de user
  app.use('/user', _user.default);
  // Agregado el enrutado de project
  app.use('/project', _project.default);
  return app;
};

// Exportando objeto
var _default = exports.default = {
  addRoutes
};