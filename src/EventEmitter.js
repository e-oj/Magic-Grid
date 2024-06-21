
import Listener from "./Listener.js";
class EventEmitter {
    /*
        array of emitter
        emitter: takes in an event and handler
        handler: is the function it calls
    */
    #listeners;
    #idCounter

    constructor() {
        this.#listeners = [];
        this.#idCounter = 0;
    }

    removeListener(id) {
        const i = this.#listeners.findIndex(listener => listener.getId() === id);
        if(i !== -1){
            this.#listeners.splice(i, 1);
        }else{
            throw new Error(`Listener with id ${id} does not exist`);
        }
    }

    addListener(event,handler){
        let id = this.#idCounter++;
        this.#listeners.push( new Listener(id, event,handler) );
        return id;
    }

    emit(event,payload){
        for(const listener of this.#listeners){
            if(listener.getEvent() === event){
                listener.getHandler()(payload);
            }
        }
    }

    listenerCount(){
        return this.#listeners.length;
    }
}
export default EventEmitter;