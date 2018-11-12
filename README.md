# Magic Grid
## A simple, lightweight Javascript library for dynamic grid layouts.

Creating a dynamic grid layout has never been easier. With Magic Grid, all you have to do is specify a container, and listen for changes. A few other configuration options are available for convenience but it's all very simple.

### Getting Started:
```
npm install magic-grid
```

### Usage:
#### For static pages
If your container doesn't have any dynamically loaded content i.e., all its child elements are always in the DOM, you should initialize the grid this way:
```javascript
let magicGrid = new MagicGrid({
  container: "#container", // Required. Can be class or id selector
  static: true, // Required for static pages
  animate: true, // Optional
});

magicGrid.listen();
```
