export class Focus {
    #index: number|null = null;
    get index(): number|null { return this.#index; }
    set index(i: number|null) {
        if(i === null || i < 0 || 81 <= i) {
            i = null;
        }
        this.#index = i;
    }

    #num: number|null = null;
    get num(): number|null { return this.#num; }
    set num(i: number|null) {
        if(i===null || i < 1 || 9 < i) {
            i = null;
        }
        this.#num = i;
    }
}
