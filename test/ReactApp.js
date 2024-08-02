import React, {useState} from 'react';
import useMagicGrid from './MagicGridComponent';

const GridComponent = ({ containerClass, numItems , n}) => {
    useMagicGrid({ containerClass, animate: true, gutter: 30, static: true, useMin: true, numItems ,n});

    //ngl im now exactly sure how this works
    return (
        <div className={containerClass}>
            {Array.from({length: numItems}, (_, index) => (
                <div key={index} className={`item${index + 1}`}>
                    Item {index + 1}
                </div>
            ))}
        </div>
    );
};

const App = () => {
    const [itemsp, setItems] = useState(10);
    const [n, setN] = useState(0);
    return (
        <div className="App">
            <button onClick={() => setItems(itemsp === 5 ? 10 : 5)}>Items</button>
            <button onClick={() => setN(n === 1 ? 0 : 1)}>Flip</button>

            <div className="grid-wrapper1">
                <GridComponent containerClass="container" numItems={itemsp} n={n}/>
            </div>
            <div className="grid-wrapper2">
                <GridComponent containerClass="container2" numItems={itemsp - 4} n={n}/>
            </div>
        </div>
    );
};

export default App;
