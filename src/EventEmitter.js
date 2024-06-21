
import Listener from "./Listener.js";
class EventEmitter {
    /*
        array of emitter
        emitter: takes in an event and handler
        handler: is the function it calls
    */
    listeners;
    #idCounter

    constructor() {
        this.listeners = [];
        this.#idCounter = 0;
    }

    removeListener(id) {
        const i = this.listeners.findIndex(listener => listener.id === id);
        if(i !== -1){
            this.listeners.splice(i, 1);
            return true;
        }
        return false;
    }

    addListener(event,handler){
        let id = this.#idCounter++;
        this.listeners.push( new Listener(id, event,handler) );
        return id;
    }

    emit(event,payload){
        for(const listener of this.listeners){
            if(listener.event === event){
                listener.handler(payload);
            }
        }
    }

}
export default EventEmitter;