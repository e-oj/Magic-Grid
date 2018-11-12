# Magic Grid
## A simple, lightweight Javascript library for dynamic grid layouts.

Creating a dynamic grid layout has never been easier. With Magic Grid, all you have to do is specify a container, and listen for changes. A few other configuration options are available for convenience but it's all very simple.

### Getting Started:
```
npm install magic-grid
```

### Usage:
#### For static content
If your container doesn't have any dynamically loaded content i.e., all its child elements are always in the DOM, you should initialize the grid this way:
```javascript
let magicGrid = new MagicGrid({
  container: "#container", // Required. Can be class or id selector
  static: true, // Required for static pages
  animate: true, // Optional
});

magicGrid.listen();
```

#### For dynamic content
If the container relies on data from an api, or experiences a delay, for whatever reason, before it can render its content in the DOM, you need to let the grid know how many items to expect:
```javascript
let magicGrid = new MagicGrid({
  container: "#container", // Required. Can be class or id selector
  items: 20, // For a grid with 20 items. Required for dynamic pages
  animate: true, // Optional
});

magicGrid.listen();
```

### API

#### MagicGrid(config)
 > config (required): Configuration object
 
```javascript
let magicGrid = new MagicGrid({
  container: "#container", // Required. Class or id of the container.
  static: "false", // Required for static pages. Default: false.
  items: 30, // Required for dynamic pages. Number of items in the container.
  gutter: 30, // Optional. Space between items. Default: 25(px)
  maxColumns: 5, // Maximum number of colums. Default: Infinite
});
```

Constructor for the MagicGrid class

#### .listen()
Positions the items and listens for changes to the window size. All items are repositioned whenever the window is resized.
```javascript
let magicGrid = new MagicGrid({
  container: "#container", // Required. Can be class or id selector
  static: true, // Required for static pages
  animate: true, // Optional
});

magicGrid.listen();
```
