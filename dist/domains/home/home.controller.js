"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Actions methods
// GET "/"
// GET "/index"
const home = (req, res) => {
  const iconSet = ['⭐', '🤖', '🍉', '📲', '🪸', '🌠', '🦾'];
  const icon = iconSet[Math.floor(Math.random() * 3)];
  res.render('home/homeView', {
    icon
  });
};

// GET "/about"
const about = (req, res) => {
  res.render('home/aboutView', {
    appVersion: '1.0.0'
  });
};

// Controlador Home
var _default = exports.default = {
  home,
  about
};