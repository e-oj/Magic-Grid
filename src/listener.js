class Listener{
    /*
     Listener class holds the event,
     handler and a unique id
     */
    id;
    event;
    handler;

    constructor(id,event, handler){
        this.id = id;
        this.event = event;
        this.handler = handler;
    }

}
export default Listener;
