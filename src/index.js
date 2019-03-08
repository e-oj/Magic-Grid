/**
 * @author emmanuelolaojo
 * @since 11/10/18
 *
 * The MagicGrid class is an
 * implementation of a flexible
 * grid layout.
 */

import {
  checkParams,
  getMin
} from "./utils";

class MagicGrid {
  /**
   * Initializes the necessary variables
   * for a magic grid.
   *
   * @param config - configuration object
   */
  constructor (config) {
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
    this._timeout = null;

    // bind this context to public methods
    this.positionItems = this.positionItems.bind(this);
    this.listen = this.listen.bind(this);
    this.destroy = this.destroy.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.init();
  }

  /**
   * Initializes styles
   *
   * [1] - Add event listener
   * [2] - Fix small positioning bump https://cl.ly/ba80133631a9
   *
   * @public
   */
  init () {
    if (!this.ready() || this.started) return;

    this.container.style.position = "relative";

    for (let i = 0; i < this.items.length; i++) {
      let style = this.items[i].style;

      style.position = "absolute";

      if (this.animate) {
        style.transition = `${this.useTransform ? "transform" : "top, left"} 0.2s ease`;
      }
    }

    this.listen(); // [1]
    this.positionItems(); // [2]
    this.started = true;
  }

  /**
   * Calculates the width of a column.
   *
   * @return width of a column in the grid
   * @private
   */
  colWidth () {
    return this.items[0].getBoundingClientRect().width + this.gutter;
  }

  /**
   * Initializes an array of empty columns
   * and calculates the leftover whitespace.
   *
   * @return {{cols: Array, wSpace: number}}
   * @private
   */
  setup () {
    let width = this.container.getBoundingClientRect().width;
    let colWidth = this.colWidth();
    let numCols = Math.floor(width/colWidth) || 1;
    let cols = [];

    if (this.maxColumns && numCols > this.maxColumns) {
      numCols = this.maxColumns;
    }

    for (let i = 0; i < numCols; i++) {
      cols[i] = {height: 0, index: i};
    }

    let wSpace = width - numCols * colWidth + this.gutter;

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
  nextCol (cols, i) {
    if (this.useMin) {
      return getMin(cols);
    }

    return cols[i % cols.length];
  }

  /**
   * Positions each item in the grid, based
   * on their corresponding column's height
   * and index then stretches the container to
   * the height of the grid.
   *
   * @public
   */
  positionItems () {
    let { cols, wSpace } = this.setup();
    let maxHeight = 0;
    let colWidth = this.colWidth();

    wSpace = Math.floor(wSpace / 2);

    for (let i = 0; i < this.items.length; i++) {
      let col = this.nextCol(cols, i);
      let item = this.items[i];
      let topGutter = col.height ? this.gutter : 0;
      let left = col.index * colWidth + wSpace + "px";
      let top = col.height + topGutter + "px";

      if(this.useTransform){
        item.style.transform = `translate(${left}, ${top})`;
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
  }

  /**
   * Checks if every item has been loaded
   * in the dom.
   *
   * @return {Boolean} true if every item is present
   */
  ready () {
    if (this.static) return true;
    return this.items.length >= this.size;
  }

  /**
   * Periodically checks that all items
   * have been loaded in the dom. Calls
   * this.listen() once all the items are
   * present.
   *
   * @private
   */
  getReady () {
    let interval = setInterval(() => {
      this.container = document.querySelector(this.containerClass);
      this.items = this.container.children;

      if (this.ready()) {
        clearInterval(interval);

        this.init();
      }
    }, 100);
  }

  /**
   * Positions all the items and
   * repositions them whenever the
   * window size changes.
   *
   * @public
   */
  listen () {
    if (this.ready()) {
      window.addEventListener("resize", this.handleWindowResize)
      this.positionItems();
    }
    else this.getReady();
  }

  /**
   * call positionItems() on window resize
   * note: referenceable, so it can be removed
   *
   * @private
   */
  handleWindowResize() {
    if (!this._timeout){
      this._timeout = setTimeout(() => {
        this.positionItems();
        this._timeout = null;
      }, 200);
    }
  }

  /**
   * Remove all applied style properties and events
   *
   * @public
   */
  destroy() {
    // remove container applied style properties
    this.container.style.removeProperty("height");
    this.container.style.removeProperty("position");

    // convert HTMLCollection to iterable
    let itemsArr = [].slice.call(this.items);
    // remove grid items applied style properties
    itemsArr.map(item => {
      item.style.removeProperty("position")
      item.style.removeProperty("transition")
      if (this.useTransform) {
        item.style.removeProperty('transform')
      } else {
        item.style.removeProperty("top");
        item.style.removeProperty("left");
      }
    })

    // removeEvents
    window.removeEventListener("resize", this.handleWindowResize);

    // turn off flag
    this.started = false;
  };
}

export default MagicGrid;
