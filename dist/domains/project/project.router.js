"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _project = _interopRequireDefault(require("./project.controller"));
var _validateFactory = _interopRequireDefault(require("../../services/validateFactory"));
var _project2 = _interopRequireDefault(require("./project.validator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Importando el Router de Express

// Importando el controlador

// Importando factory de validación

// Importando el validador de proyectos

// Creando una isntancia del enrutador
const router = new _express.Router();

// Enrutamos
// GET "/project"
router.get('/', _project.default.showDashboard);

// GET "/project/add"
router.get('/add', _project.default.add);

// POST "/project/add"
router.post('/add', (0, _validateFactory.default)({
  schema: _project2.default.projectSchema,
  getObject: _project2.default.getProject
}), _project.default.addPost);

// GET "/project/edit/:id"
router.get('/edit/:id', _project.default.edit);

// PUT "/project/edit/:id"
router.put('/edit/:id', (0, _validateFactory.default)({
  schema: _project2.default.projectSchema,
  getObject: _project2.default.getProject
}), _project.default.editPut);

// DELETE "/project/:id"
router.delete('/:id', _project.default.deleteProject);

// Exporto este tramo de ruta
var _default = exports.default = router;