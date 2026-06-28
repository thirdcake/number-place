import { Digit } from "./digits";

export class Focus {
    #current = new Digit();
    #next = new Digit();
    set index(idx: number) {
        if(idx < 0 || 81 <= idx) return;
        if(this.#current === null) {
            this.#next = this.#current;
            this.#current = {
                index: 
            }
        }else if(this.#current)
    }
}
