"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  Router
} = _express.default;
const router = Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});
var _default = exports.default = router;