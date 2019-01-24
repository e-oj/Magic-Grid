/**
 * main decleration file
 *
 * @author zakaria harti
 */

/**
 * configuration object of the MagicGrid constructor
 */
export interface MagicGridProps{
  container: string | HTMLElement;
  static?: boolean;
  items?: number;
  gutter?: number;
  maxColumns?: number;
  useMin?: boolean;
  useTransform?: boolean;
  animate?: boolean;
}

export default MagicGrid;

/**
 * MagicGrid class
 */
declare class MagicGrid {
  /**
   * class constructor
   *
   * @param {object} config
   */
  constructor(config: MagicGridProps);

  /**
   * Positions all the items and
   * repositions them whenever the
   * window size changes.
   *
   * @returns {void}
   */
   listen(): void;

  /**
   * Position each items in the container
   * based on their corresponding columns
   * values.
   *
   * @returns {void}
   */
  positionItems(): void;

  /**
   * Checks if every items has been loaded
   * in the dom.
   *
   * @return {Boolean} true if every items is present
   */
   ready(): boolean;

   /**
    * Initializes styles
    *
    * @private
    */
   private init(): void;

   /**
    * Calculates the width of a column.
    *
    * @return width of a column in the grid
    * @private
    */
   private colWidth(): number;

   /**
    * Initializes an array of empty columns
    * and calculates the leftover whitespace.
    *
    * @return {{cols: Array, wSpace: number}}
    * @private
    */
   private setup(): object;

   /**
    * Gets the next available column.
    *
    * @param cols list of columns
    * @param i index of dom element
    *
    * @return {*} next available column
    * @private
    */
   private nextCol(cols: object[], i: number): object;

   /**
    * Periodically checks that all items
    * have been loaded in the dom. Calls
    * this.listen() once all the items are
    * present.
    *
    * @private
    */
   private getReady(): void;
}

/**
 * Validates the configuration object.
 *
 * @param config - configuration object
 */
declare function checkParams(config: MagicGridProps): void;

/**
 * Finds the shortest column in
 * a column list
 *
 * @param cols - list of columns
 *
 * @return longest column
 */
declare function getMin(cols: object[]): object;
