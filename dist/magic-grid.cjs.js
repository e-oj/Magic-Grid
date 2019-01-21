'use strict';

/**
 * @author emmanuelolaojo
 * @since 11/11/18
 */

/**
 * Validates the configuration object.
 *
 * @param config - configuration object
 */
var checkParams = function (config) {
  var DEFAULT_GUTTER = 25;

  if (!config) {
    throw new Error("No config object has been provided.");
  }

  if(typeof config.useTransform !== "boolean"){
    config.useTransform = true;
  }

  if(typeof config.gutter !== "number"){
    config.gutter = DEFAULT_GUTTER;
  }

  if (!config.container) { error("container"); }
  if (!config.items && !config.static) { error("items or static"); }
};


/**
 * Handles invalid configuration object
 * errors.
 *
 * @param prop - a property with a missing value
 */
var error = function (prop) {
  throw new Error(("Missing property '" + prop + "' in MagicGrid config"));
};

/**
 * Finds the shortest column in
 * a column list.
 *
 * @param cols - list of columns
 *
 * @return shortest column
 */
var getMin = function (cols) {
  var min = cols[0];

  for (var col of cols) {
    if (col.height < min.height) { min = col; }
  }

  return min;
};

/**
 * @author emmanuelolaojo
 * @since 11/10/18
 *
 * The MagicGrid class is an
 * implementation of a flexible
 * grid layout.
 */

var MagicGrid = function MagicGrid (config) {
  checkParams(config);

  if (config.container instanceof HTMLElement) {
    this.container = config.container;
    this.containerClass = config.container.className;
  }
  else {
    this.containerClass = config.container;
    this.container = document.querySelector(config.container);
  }

  this.items = this.container.children;
  this.static = config.static || false;
  this.size = config.items;
  this.gutter = config.gutter;
  this.maxColumns = config.maxColumns || false;
  this.useMin = config.useMin || false;
  this.useTransform = config.useTransform;
  this.animate = config.animate || false;
  this.started = false;

  this.init();
};

/**
 * Initializes styles
 *
 * @private
 */
MagicGrid.prototype.init = function init () {
  if (!this.ready() || this.started) { return; }

  this.container.style.position = "relative";

  for (var i = 0; i < this.items.length; i++) {
    var style = this.items[i].style;

    style.position = "absolute";
  
    if (this.animate) {
      style.transition = (this.useTransform ? "transform" : "top, left") + " 0.2s ease";
    }
  }

  this.started = true;
};

/**
 * Calculates the width of a column.
 *
 * @return width of a column in the grid
 * @private
 */
MagicGrid.prototype.colWidth = function colWidth () {
  return this.items[0].getBoundingClientRect().width + this.gutter;
};

/**
 * Initializes an array of empty columns
 * and calculates the leftover whitespace.
 *
 * @return {{cols: Array, wSpace: number}}
 * @private
 */
MagicGrid.prototype.setup = function setup () {
  var width = this.container.getBoundingClientRect().width;
  var colWidth = this.colWidth();
  var numCols = Math.floor(width/colWidth) || 1;
  var cols = [];

  if (this.maxColumns && numCols > this.maxColumns) {
    numCols = this.maxColumns;
  }

  for (var i = 0; i < numCols; i++) {
    cols[i] = {height: 0, index: i};
  }

  var wSpace = width - numCols * colWidth + this.gutter;

  return {cols: cols, wSpace: wSpace};
};

/**
 * Gets the next available column.
 *
 * @param cols list of columns
 * @param i index of dom element
 *
 * @return {*} next available column
 * @private
 */
MagicGrid.prototype.nextCol = function nextCol (cols, i) {
  if (this.useMin) {
    return getMin(cols);
  }

  return cols[i % cols.length];
};

/**
 * Positions each item in the grid, based
 * on their corresponding column's height
 * and index then stretches the container to
 * the height of the grid.
 */
MagicGrid.prototype.positionItems = function positionItems () {
  var ref = this.setup();
    var cols = ref.cols;
    var wSpace = ref.wSpace;
  var maxHeight = 0;
  var colWidth = this.colWidth();

  wSpace = Math.floor(wSpace / 2);

  for (var i = 0; i < this.items.length; i++) {
    var col = this.nextCol(cols, i);
    var item = this.items[i];
    var topGutter = col.height ? this.gutter : 0;
    var left = col.index * colWidth + wSpace + "px";
    var top = col.height + topGutter + "px";

    if(this.useTransform){
      item.style.transform = "translate(" + left + ", " + top + ")";
    }
    else{
      item.style.top = top;
      item.style.left = left;
    }

    col.height += item.getBoundingClientRect().height + topGutter;

    if(col.height > maxHeight){
      maxHeight = col.height;
    }
  }

  this.container.style.height = maxHeight + "px";
};

/**
 * Checks if every item has been loaded
 * in the dom.
 *
 * @return {Boolean} true if every item is present
 */
MagicGrid.prototype.ready = function ready () {
  if (this.static) { return true; }
  return this.items.length >= this.size;
};

/**
 * Periodically checks that all items
 * have been loaded in the dom. Calls
 * this.listen() once all the items are
 * present.
 *
 * @private
 */
MagicGrid.prototype.getReady = function getReady () {
    var this$1 = this;

  var interval = setInterval(function () {
    this$1.container = document.querySelector(this$1.containerClass);
    this$1.items = this$1.container.children;

    if (this$1.ready()) {
      clearInterval(interval);

      this$1.init();
      this$1.listen();
    }
  }, 100);
};

/**
 * Positions all the items and
 * repositions them whenever the
 * window size changes.
 */
MagicGrid.prototype.listen = function listen () {
    var this$1 = this;

  if (this.ready()) {
    var timeout;

    window.addEventListener("resize", function () {
      if (!timeout){
        timeout = setTimeout(function () {
          this$1.positionItems();
          timeout = null;
        }, 200);
      }
    });

    this.positionItems();
  }
  else { this.getReady(); }
};

module.exports = MagicGrid;
