class Listener{
    #id;
    #event;
    #handler;
    constructor(id,event, handler){
        this.#id = id;
        this.#event = event;
        this.#handler = handler;
    }

    getId(){
        return this.#id;
    }

    getEvent(){
        return this.#event;
    }

    getHandler(){
        return this.#handler;
    }


}
export default Listener;