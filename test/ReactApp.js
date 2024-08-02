import React from 'react';
import GridComponent from './MagicGridComponent';

const App = () => {
    const [itemsp, setItems] = React.useState(10);
    return (
        <div className="App">
            <button onClick={() => setItems(itemsp === 30 ? 10 : 30)}>Items</button>
            <div className="grid-wrapper1">
                <GridComponent containerClass="container" numItems={itemsp}/>
            </div>
            <div className="grid-wrapper1">
                <GridComponent containerClass="container2" numItems={1}/>
            </div>
        </div>
    );
};

export default App;
