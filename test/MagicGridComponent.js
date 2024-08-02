import { useEffect, useRef } from 'react';
import MagicGrid from 'magic-grid';
import './MagicGrid.css';

const useMagicGrid = (props) => {
    const magicGrid = useRef(null);
    //const n = props.n;
    useEffect(() => {
        if (!magicGrid.current) {
            console.log('useMagicGrid ', props.numItems);
            const grid = new MagicGrid({container: `.container`, ...props, items: props.items || 1, static: false});
            magicGrid.current = grid;
            grid.listen();
        } else if(magicGrid.current) {
            console.log('positionItems ',props.numItems);
            magicGrid.current.positionItems();
        }
    }, [props]);
    return magicGrid.current;
};

export default useMagicGrid;

