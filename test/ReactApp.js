import React, {useState} from 'react';
import useMagicGrid from './MagicGridComponent';

const GridComponent = (({ containerClass, numItems}) => {
    const grid = useMagicGrid({ containerClass, animate: true, gutter: 30, static: true, useMin: true, numItems});

    //ngl im not exactly sure how this works
    return (
        <div className={containerClass}>
            {Array.from({length: numItems}, (_, index) => (
                <div key={index} className={`item${index + 1}`}>
                    {index + 1}
                </div>
            ))}
        </div>
    );
});

const App = () => {

    const [items, setItems] = useState(10);
    const grids = useMagicGrid({
        containerClass: 'container',
        numItems: items,
        animate: true,
        gutter: 30,
        static: true,
        useMin: true,
    });
    useMagicGrid({
        containerClass: 'container',
        numItems: items,
        animate: true,
        gutter: 30,
        static: true,
        useMin: true,
    });
    return (
        <div className="App">
            <button onClick={() => setItems(items === 5 ? 10 : 5)}>Items</button>
            <div className="containera">
                <GridComponent containerClass="container" numItems={items}/>
            </div>
            <div className="containerb">
                <GridComponent containerClass="container2" numItems={items-1}/>
            </div>
        </div>
    );
};

export default App;
