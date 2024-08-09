import './MagicGrid.css';

class ReactObject{

    grid;
    id;

    constructor(props) {
        this.grid = props.grid;
        this.id = props.containerClass;
    }
}

export default ReactObject;