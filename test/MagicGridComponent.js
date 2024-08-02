import React, { useEffect, useRef } from 'react';
import MagicGrid from 'magic-grid';
import './MagicGrid.css';

const useMagicGrid = (props) => {
    const magicGrid = useRef(null);
    useEffect(() => {
        if (!magicGrid.current) {
            console.log('useMagicGrid');
            const grid = new MagicGrid({ container: `.${props.containerClass}`, ...props, items: props.items || 1, static: false });
            magicGrid.current = grid;
            grid.listen();
        }else{
            console.log('positionItems');
            magicGrid.current.positionItems();
        }
    }, [props]);
    return magicGrid.current;
};

const GridComponent = ({ containerClass, numItems }) => {
    useMagicGrid({ containerClass, animate: true, gutter: 30, static: true, useMin: true, numItems });
    return (
        <div className={containerClass}>
            {Array.from({length: numItems}, (_, index) => (
                <div key={index} className={`grid-item item${index + 1}`}>
                    Item {index + 1}
                </div>
            ))}
        </div>
    );
};

export default GridComponent;
