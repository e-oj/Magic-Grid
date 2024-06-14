
class EventEmitter {
    //array of emitter
    //emitter: takes in an event and handler
    //handler: is the function it calls
    #listeners;

    constructor() {
        this.#listeners = [];
    }

    addListener(event,handler){
        this.#listeners.push( {event,handler} );
    }

    emit(event,payload){
        for(const listener of this.#listeners){
            if(listener.event === event){
                listener.handler(payload);
            }
        }
    }
}
export default EventEmitter;