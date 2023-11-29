"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _user = _interopRequireDefault(require("./user.controller"));
var _user2 = _interopRequireDefault(require("./user.validator"));
var _validateFactory = _interopRequireDefault(require("../../services/validateFactory"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Importando el Router de Express

// Importando el controlador

// Importando el validador del usuario

// Importando el factory de validación

// Creando una isntancia del enrutador
const router = new _express.Router();

// Enrutamos
// GET '/user/login'
router.get('/login', _user.default.login);

// GET '/user/logout'
router.get('/logout', _user.default.logout);

// GET '/user/register'
router.get('/register', _user.default.register);

// POST '/user/register'
router.post('/register', (0, _validateFactory.default)(_user2.default.signUp), _user.default.registerPost);

// Exporto este tramo de ruta
var _default = exports.default = router;