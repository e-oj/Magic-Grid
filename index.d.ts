/**
 * main declaration file
 *
 * @author zakaria harti
 */

/**
 * configuration object of the MagicGrid constructor
 */
export interface MagicGridProps {
    container: string | HTMLElement;
    static?: boolean;
    items?: number;
    gutter?: number;
    maxColumns?: number;
    useMin?: boolean;
    useTransform?: boolean;
    animate?: boolean;
    center?: boolean;
}

/**
 * Listener class
 */

declare class Listener {
    id: number;
    event: string;
    handler: (payload?: any) => void;

    constructor(id: number, event: string, handler: (payload?: any) => void);
}

/**
 * EventEmitter class
 */
declare class EventEmitter {
    listeners: Array<Listener>;
    private idCounter: number;

    constructor();

    removeListener(id: number): boolean;

    addListener(event: string, handler: (payload?: any) => void): number;

    emit(event: string, payload?: any): void;
}

/**
 * MagicGrid class
 */
declare class MagicGrid extends EventEmitter {
    container: HTMLElement;
    containerClass: string;
    static: boolean;
    size: number;
    gutter: number;
    maxColumns: number | false;
    useMin: boolean;
    useTransform: boolean;
    animate: boolean;
    center: boolean;
    styledItems: Set<HTMLElement>;
    resizeObserver: ResizeObserver | null;
    isPositioning: boolean;

    /**
     * class constructor
     *
     * @param {MagicGridProps} config
     */
    constructor(config: MagicGridProps);

    /**
     * Set a new container. Useful in cases where
     * the container reference changes for any reason.
     *
     * @param container
     */
    setContainer(container: HTMLElement)

    /**
     * Positions all the items and
     * repositions them whenever the
     * window size changes.
     *
     * @returns {void}
     */
    listen(): void;

    /**
     * Position each item in the container
     * based on their corresponding columns
     * values.
     *
     * @returns {void}
     */
    positionItems(): void;

    /**
     * Checks if every item has been loaded
     * in the dom.
     *
     * @return {boolean} true if every item is present
     */
    ready(): boolean;

    /**
     * Initializes styles
     *
     * @private
     */
    private initStyles(): void;

    /**
     * Gets a collection of all items in a grid.
     *
     * @return {HTMLCollection}
     * @private
     */
    private items(): HTMLCollection;

    /**
     * Calculates the width of a column.
     *
     * @return {number} width of a column in the grid
     * @private
     */
    private colWidth(): number;

    /**
     * Initializes an array of empty columns
     * and calculates the leftover whitespace.
     *
     * @return {{cols: Array<object>, wSpace: number}}
     * @private
     */
    private setup(): { cols: Array<{ height: number; index: number }>; wSpace: number };

    /**
     * Gets the next available column.
     *
     * @param cols list of columns
     * @param i index of dom element
     *
     * @return {object} next available column
     * @private
     */
    private nextCol(cols: Array<{ height: number; index: number }>, i: number): { height: number; index: number };

    /**
     * Periodically checks that all items
     * have been loaded in the dom. Calls
     * this.listen() once all the items are
     * present.
     *
     * @private
     */
    private getReady(): void;

    /**
     * Observes changes in the container size and repositions items
     * @private
     */
    private observeContainerResize(): void;

    /**
     * Adds a callback for when positioning is complete
     * @param callback - function to be called on positioning complete
     */
    onPositionComplete(callback: () => void): void;
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
 * @return {object} shortest column
 */
declare function getMin(cols: Array<{ height: number; index: number }>): { height: number; index: number };

export default MagicGrid;
