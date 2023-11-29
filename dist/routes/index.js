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

/* GET home page. */
router.get('/', (req, res) => {
  const iconSet = ['⭐', '🤖', '🍉'];
  const icon = iconSet[Math.floor(Math.random() * 3)];
  res.render('index', {
    title: 'Express with babel and HRM',
    icon
  });
});
router.get('/author', (req, res) => {
  // Creating a View-Model
  const author = {
    name: '',
    lastname: '',
    job: ''
  };
  // Sending the view-model to be rendered by a View
  res.render('author', author);
});
var _default = exports.default = router;