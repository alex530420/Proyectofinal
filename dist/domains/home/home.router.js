"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _home = _interopRequireDefault(require("./home.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Importando el Router de Express

// Importando el controlador

// Creando una isntancia del enrutador
const router = new _express.Router();

// Enrutamos
// GET '/'
// GET '/home'
// GET '/index
router.get(['/', '/home', '/index'], _home.default.home);
// Get about
router.get('/about', _home.default.about);
// Exporto este tramo de ruta
var _default = exports.default = router;