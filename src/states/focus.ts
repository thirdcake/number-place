export class Focus {
    #index: number|null = null;
    #bit: number|null = null;

    #cellFirst = true;

    constructor(index: number|null = null, bit: number|null = null) {
        this.#index = index;
        this.#bit = bit;
    }

    get index(): number|null { return this.#index; }
    updateIndex(index: number|null): Focus {
        if(this.#index === index) return this;
        const focus = new Focus();
        focus.#index = index;
        focus.#bit = this.#bit;
        focus.#cellFirst = this.#cellFirst;
        return focus;
    }

    get bit(): number|null { return this.#bit; }
    updateBit(bit: number|null): Focus {
        if(this.#bit === bit) return this;
        const focus = new Focus();
        focus.#index = this.#index;
        focus.#bit = bit;
        focus.#cellFirst = this.#cellFirst;
        return this;
    }

    get isCellFirst(): boolean { return this.#cellFirst; }
    toggleCellFirst(): void {
        this.#cellFirst = !this.#cellFirst;
    }
}
