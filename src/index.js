/**
 * @author emmanuelolaojo
 * @since 11/10/18
 *
 * The MagicGrid class is an
 * implementation of a flexible
 * grid layout.
 */

import {
  getMax,
  checkParams,
  getMin
} from './utils'

class MagicGrid {
  /**
   * Initializes the necessary variables
   * for a magic grid.
   *
   * @param config - configuration object
   */
  constructor (config) {
    checkParams(config)

    this.containerClass = config.container
    this.container = document.querySelector(config.container)
    this.item = this.container.children
    this.static = config.static || false
    this.size = config.items
    this.gutter = config.gutter || 25
    this.maxColumns = config.maxColumns || false
    this.useMin = config.useMin || false
    this.animate = config.animate || false
    this.started = false

    this.init()
  }

  /**
   * Initializes styles
   *
   * @private
   */
  init () {
    if (!this.ready() || this.started) return

    this.container.style.position = 'relative'
    for (let i = 0; i < this.item.length; i++) {
      this.item[i].style.position = 'absolute'
  
      if (this.animate) {
        this.item[i].style.transition = 'top,left 0.2s ease'
      }
    }

    this.started = true
  }

  /**
   * Calculates the width of a column.
   *
   * @return width of a column in the grid
   * @private
   */
  colWidth () {
    return this.item[0].getBoundingClientRect().width + this.gutter
  }

  /**
   * Initializes an array of empty columns
   * and calculates the leftover whitespace.
   *
   * @return {{cols: Array, wSpace: number}}
   * @private
   */
  setup () {
    let width = this.container.getBoundingClientRect().width
    let numCols = Math.floor(width / this.colWidth()) || 1
    let cols = []

    if (this.maxColumns && numCols > this.maxColumns) {
      numCols = this.maxColumns
    }

    for (let i = 0; i < numCols; i++) {
      cols[i] = {
        height: 0,
        top: 0,
        index: i
      }
    }

    let wSpace = width - numCols * this.colWidth() + this.gutter

    return {
      cols,
      wSpace
    }
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
      return getMin(cols)
    }

    return cols[i % cols.length]
  }

  /**
   * Position each item in the container
   * based on their corresponding columns
   * values.
   */
  positionItems () {
    let { cols, wSpace } = this.setup()

    wSpace = Math.floor(wSpace / 2)

    for (let i = 0; i < this.item.length; i++) {
      let min = this.nextCol(cols, i)
      let left = min.index * this.colWidth() + wSpace
      let item = this.item[i]

      item.style.left = left + 'px'
      item.style.top = min.height + min.top + 'px'

      min.height += min.top + item.getBoundingClientRect().height
      min.top = this.gutter
    }

    this.container.style.height = getMax(cols).height
  }

  /**
   * Checks if every item has been loaded
   * in the dom.
   *
   * @return {Boolean} true if every item is present
   */
  ready () {
    if (this.static) return true
    return this.container.length > 0 && this.item.length === this.size
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
      this.container = document.querySelector(this.containerClass)
      this.item = this.container.children

      if (this.ready()) {
        clearInterval(interval)

        this.init()
        this.listen()
      }
    }, 100)
  }

  /**
   * Positions all the items and
   * repositions them whenever the
   * window size changes.
   */
  listen () {
    if (this.ready()) {
      this.positionItems()

      window.addEventListener('resize', () => {
        setTimeout(this.positionItems(), 200)
      })
    } else this.getReady()
  }
}

export default MagicGrid
