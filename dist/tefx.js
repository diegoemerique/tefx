(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tefx", [], factory);
	else if(typeof exports === 'object')
		exports["tefx"] = factory();
	else
		root["tefx"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tefx = function () {
  function tefx(selector) {
    _classCallCheck(this, tefx);

    this.elements = (0, _helpers.grebElement)(selector);
    this.elementsNodes = {};
    return this;
  }

  _createClass(tefx, [{
    key: 'cleanText',
    value: function cleanText(element) {
      Object.keys(element.nodes).map(function (key, index) {
        // VOLTAR AQUI E PEGAR TEXTO E SALVAR RELATIVO A KEY
      });
      if (node.nodeName === '#text') {
        var obj = {
          text: node.textContent,
          parent: node
        };

        this.textsMap.push(obj);
        node.textContent = '';
      } else {
        var childNodes = node.childNodes;

        return childNodes.length > 0 ? this.loopChild(childNodes) : false;
      }
    }
  }, {
    key: 'loopChild',
    value: function loopChild() {
      var that = this;

      Object.keys(this.elementsNodes).map(function (key, index) {
        that.cleanText(that.elementsNodes[key]);
      });
    }
  }, {
    key: 'parseHtml',
    value: function parseHtml(element, key) {
      var nodes = element.childNodes;
      var elementChildren = element.children;

      this.elementsNodes[key] = { key: key, nodes: nodes, elementChildren: elementChildren };
      this.loopChild();
    }
  }, {
    key: 'initialSetup',
    value: function initialSetup() {
      var elements = this.elements;

      Object.keys(elements).map(function (key, index) {
        elements[key].style.opacity = '1';
      });
    }
  }, {
    key: 'start',
    value: function start() {
      var elements = this.elements;
      var that = this;

      this.initialSetup();

      Object.keys(elements).map(function (key, index) {
        that.parseHtml(elements[key], key);
      });
    }
  }]);

  return tefx;
}();

;

exports.default = tefx;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LETTERS = 'abcdefghijklmnopqrstuvwxyz#%&^+=-';

function selectorType(selector) {
  var isClass = /(\.)[\S]+/gi.test(selector);
  var isId = /(\#)[\S]+/gi.test(selector);
  var isTag = /(\w)[\S]+/gi.test(selector);

  if (isClass) {
    return 'class';
  }
  if (isId) {
    return 'id';
  }
  if (isTag) {
    return 'tag';
  }

  return false;
}

function grebElement(selector) {
  var cleanSelector = selector.replace(/\.|\#/g, '');

  if (selectorType(selector) === 'class') {
    return document.getElementsByClassName(cleanSelector);
  } else if (selectorType(selector) === 'id') {
    return document.getElementsById(cleanSelector);
  }

  return document.querySelectorAll(cleanSelector);
}

exports.grebElement = grebElement;
exports.LETTERS = LETTERS;

/***/ })
/******/ ]);
});
//# sourceMappingURL=tefx.js.map