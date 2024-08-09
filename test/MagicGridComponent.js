import { useEffect, useRef, useState } from 'react';
import MagicGrid from 'magic-grid';
import ReactObject from './ReactObject.js';
import './MagicGrid.css';

const useMagicGrid = (props) => {
    const [grids, setGrids] = useState([]);
    const magicGrid = useRef(grids.find(grid => grid.id === props.containerClass));

    useEffect(() => {
        if (!magicGrid.current) {
            const grid = new MagicGrid({ container: `.${props.containerClass}`, ...props, items: props.items || 1, static: false});
            const gridObject = new ReactObject(grid, props.containerClass);
            magicGrid.current = grid;
            const newGrids = prevGrids => [...prevGrids, gridObject];
            setGrids(newGrids);
            grid.listen();
        }
    }, );

    return magicGrid.current;
};

export default useMagicGrid;

