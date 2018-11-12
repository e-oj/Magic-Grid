/**
 * @author emmanuelolaojo
 * @since 11/10/18
 *
 * The MagicGrid class is an
 * implementation of a flexible
 * grid layout.
 */

import jquery from "jquery";
import {getMax, checkParams, getMin} from "./utils"

export default class MagicGrid {
  /**
   * Initializes the necessary variables
   * for a magic grid.
   *
   * @param config - configuration object
   */
  constructor(config){
    checkParams(config);

    this.$ = jquery;
    this.containerClass = config.container;
    this.container = this.$(config.container);
    this.item = this.container.children();
    this.static = config.static || false;
    this.size = config.items;
    this.gutter = config.gutter || 25;
    this.maxColumns = config.maxColumns || false;
    this.useMin = config.useMin || false;
    this.animate = config.animate || false;
    this.started = false;

    this._init();
  }

  /**
   * Initializes styles
   *
   * @private
   */
  _init(){
    if(!this.ready() || this.started) return;

    this.container.css({position: "relative"});
    this.item.css({position: "absolute"});

    if(this.animate){
      this.item.css({transition: "top,left 0.2s ease"});
    }

    this.started = true;
  }

  /**
   * Calculates the width of a column.
   *
   * @return width of a column in the grid
   * @private
   */
  _colWidth(){
    return this.item.outerWidth() + this.gutter;
  }

  /**
   * Initializes an array of empty columns
   * and calculates the leftover whitespace.
   *
   * @return {{cols: Array, wSpace: number}}
   * @private
   */
  _setup(){
    let width = this.container.outerWidth();
    let numCols = Math.floor(width/this._colWidth()) || 1;
    let cols = [];

    if(this.maxColumns && numCols > this.maxColumns){
      numCols = this.maxColumns;
    }

    for(let i = 0; i < numCols; i++){
      cols[i] = {height: 0, top: 0, index: i}
    }

    let wSpace = width - numCols * this._colWidth() + this.gutter;

    return {cols, wSpace};
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
  _nextCol(cols, i){
    if(this.useMin){
      return getMin(cols);
    }

    return cols[i % cols.length];
  }

  /**
   * Position each item in the container
   * based on their corresponding columns
   * values.
   */
  positionItems(){
    let self = this;
    let {cols, wSpace} = this._setup();

    wSpace = Math.floor(wSpace/2);

    self.item.each(function(i){
      let min = self._nextCol(cols, i);
      let left = min.index * self._colWidth() + wSpace;
      let $item = self.$(this);

      $item.css({
        left: left + "px",
        top: min.height + min.top + "px"
      });

      min.height += min.top + $item.outerHeight();
      min.top = self.gutter;
    });

    self.container.css({
      height: getMax(cols).height,
    });
  }

  /**
   * Checks if every item has been loaded
   * in the dom.
   *
   * @return {Boolean} true if every item is present
   */
  ready(){
    if(this.static) return true;
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
  _getReady(){
    let self = this;

    let interval = setInterval(function(){
      self.container = self.$(self.containerClass);
      self.item = self.container.children();

      if(self.ready()){
        clearInterval(interval);

        self._init();
        self.listen();
      }

    }, 100);
  }

  /**
   * Positions all the items and
   * repositions them whenever the
   * window size changes.
   */
  listen(){
    let self = this;

    if(self.ready()){
      self.positionItems();

      self.$(window).resize(function(){
        setTimeout(function(){
          self.positionItems();
        }, 200);
      });
    }

    else self._getReady();
  }
}