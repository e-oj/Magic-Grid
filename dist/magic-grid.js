var MagicGrid =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @author emmanuelolaojo
 * @since 11/10/18
 *
 * The MagicGrid class is an
 * implementation of a flexible
 * grid layout.
 */


var MagicGrid =
/*#__PURE__*/
function () {
  /**
   * Initializes the necessary variables
   * for a magic grid.
   *
   * @param config - configuration object
   */
  function MagicGrid(config) {
    _classCallCheck(this, MagicGrid);

    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["checkParams"])(config);
    this.containerClass = config.container;
    this.container = document.querySelector(config.container);
    this.item = this.container.children;
    this.static = config.static || false;
    this.size = config.items;
    this.gutter = config.gutter || 25;
    this.maxColumns = config.maxColumns || false;
    this.useMin = config.useMin || false;
    this.animate = config.animate || false;
    this.started = false;
    this.init();
  }
  /**
   * Initializes styles
   *
   * @private
   */


  _createClass(MagicGrid, [{
    key: "init",
    value: function init() {
      if (!this.ready() || this.started) return;
      this.container.style.position = 'relative';

      for (var i = 0; i < this.item.length; i++) {
        this.item[i].style.position = 'absolute';

        if (this.animate) {
          this.item[i].style.transition = 'top,left 0.2s ease';
        }
      }

      this.started = true;
    }
    /**
     * Calculates the width of a column.
     *
     * @return width of a column in the grid
     * @private
     */

  }, {
    key: "colWidth",
    value: function colWidth() {
      return this.item[0].getBoundingClientRect().width + this.gutter;
    }
    /**
     * Initializes an array of empty columns
     * and calculates the leftover whitespace.
     *
     * @return {{cols: Array, wSpace: number}}
     * @private
     */

  }, {
    key: "setup",
    value: function setup() {
      var width = this.container.getBoundingClientRect().width;
      var numCols = Math.floor(width / this.colWidth()) || 1;
      var cols = [];

      if (this.maxColumns && numCols > this.maxColumns) {
        numCols = this.maxColumns;
      }

      for (var i = 0; i < numCols; i++) {
        cols[i] = {
          height: 0,
          top: 0,
          index: i
        };
      }

      var wSpace = width - numCols * this.colWidth() + this.gutter;
      return {
        cols: cols,
        wSpace: wSpace
      };
    }
    /**
     * Gets the next available column.
     *
     * @param cols list of columns
     * @param i index of dom element
     *
     * @return {*} next available column
     * @private
     */

  }, {
    key: "nextCol",
    value: function nextCol(cols, i) {
      if (this.useMin) {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getMin"])(cols);
      }

      return cols[i % cols.length];
    }
    /**
     * Position each item in the container
     * based on their corresponding columns
     * values.
     */

  }, {
    key: "positionItems",
    value: function positionItems() {
      var _this$setup = this.setup(),
          cols = _this$setup.cols,
          wSpace = _this$setup.wSpace;

      wSpace = Math.floor(wSpace / 2);

      for (var i = 0; i < this.item.length; i++) {
        var min = this.nextCol(cols, i);
        var left = min.index * this.colWidth() + wSpace;
        var item = this.item[i];
        item.style.left = left + 'px';
        item.style.top = min.height + min.top + 'px';
        min.height += min.top + item.getBoundingClientRect().height;
        min.top = this.gutter;
      }

      this.container.style.height = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getMax"])(cols).height;
    }
    /**
     * Checks if every item has been loaded
     * in the dom.
     *
     * @return {Boolean} true if every item is present
     */

  }, {
    key: "ready",
    value: function ready() {
      if (this.static) return true;
      return this.container.length > 0 && this.item.length === this.size;
    }
    /**
     * Periodically checks that all items
     * have been loaded in the dom. Calls
     * this.listen() once all the items are
     * present.
     *
     * @private
     */

  }, {
    key: "getReady",
    value: function getReady() {
      var _this = this;

      var interval = setInterval(function () {
        _this.container = document.querySelector(_this.containerClass);
        _this.item = _this.container.children;

        if (_this.ready()) {
          clearInterval(interval);

          _this.init();

          _this.listen();
        }
      }, 100);
    }
    /**
     * Positions all the items and
     * repositions them whenever the
     * window size changes.
     */

  }, {
    key: "listen",
    value: function listen() {
      var _this2 = this;

      if (this.ready()) {
        this.positionItems();
        window.addEventListener('resize', function () {
          setTimeout(_this2.positionItems(), 200);
        });
      } else this.getReady();
    }
  }]);

  return MagicGrid;
}();

/* harmony default export */ __webpack_exports__["default"] = (MagicGrid);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkParams", function() { return checkParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMax", function() { return getMax; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMin", function() { return getMin; });
/**
 * @author emmanuelolaojo
 * @since 11/11/18
 */

/**
 * Validates the configuration object.
 *
 * @param config - configuration object
 */
var checkParams = function checkParams(config) {
  if (!config.container) error('container');
  if (!config.items && !config.static) error('items or static');
};

var error = function error(prop) {
  throw new Error("Missing property '".concat(prop, "' in MagicGrid config"));
};
/**
 * Finds the longest column in
 * a column list
 *
 * @param cols - list of columns
 *
 * @return longest column
 */


var getMax = function getMax(cols) {
  var max = cols[0];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = cols[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var col = _step.value;
      if (col.height > max.height) max = col;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return max;
};
/**
 * Finds the longest column in
 * a column list
 *
 * @param cols - list of columns
 *
 * @return longest column
 */


var getMin = function getMin(cols) {
  var min = cols[0];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = cols[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var col = _step2.value;
      if (col.height < min.height) min = col;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return min;
};



/***/ })
/******/ ])["default"];