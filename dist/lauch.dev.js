"use strict";

var https = require("https");

var fs = require('fs');

var express = require("express");

var path = require("path");

var options = {
  key: fs.readFileSync("C:\\Users\\LRO\\code\\web\\debianOs\\ressources\\SSL\\localhost-key.pem"),
  cert: fs.readFileSync("C:\\Users\\LRO\\code\\web\\debianOs\\ressources\\SSL\\localhost.pem")
};
var app = express();
app.get("/", function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", res.sendFile(path.join(__dirname, "./index.html")));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.get("/styles/CSS/:file", function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", res.sendFile(path.join(__dirname, "./styles/CSS", req.params.file)));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.get("/scripts/JS/:file", function _callee3(req, res, next) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", res.sendFile(path.join(__dirname, "./scripts/JS", req.params.file)));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.get("/ressources/app/:file", function _callee4(req, res, next) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", res.sendFile(path.join(__dirname, "./ressources/app", req.params.file)));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.get("/ressources/os/:file", function _callee5(req, res, next) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", res.sendFile(path.join(__dirname, "./ressources/os", req.params.file)));

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
});
https.createServer(options, app).listen(5502);