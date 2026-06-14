export class Options {
    #cellFirstMode = true;
    get isCellFirst(): boolean { return this.#cellFirstMode; }
    get isNumFirst(): boolean { return !this.#cellFirstMode; }
    toggleFirstMode(): void {
        this.#cellFirstMode = !this.#cellFirstMode;
    }

    #penMode = true;
    get isPen(): boolean { return this.#penMode; }
    get isPencil(): boolean { return !this.#penMode; }
    togglePenMode(): void { this.#penMode = !this.#penMode; }
}
