export class History {
    #history:{index: number, prev: number, next: number}[] = [];
    #current: number = 0;

    save(index: number, prev: number, next: number): void {
        if(prev === next) return;

        this.#history.filter((_, i) => i<this.#current);
        this.#history.push({index, prev, next});
        this.#current = this.#history.length;
    }

    get canUndo(): boolean {
        return this.#current > 0;
    }

    undo():{index: number, prev: number, next: number}|null {
        if(this.canUndo) {
            this.#current -= 1;
            return this.#history[this.#current];
        }
        return null;
    }

    get canRedo(): boolean {
        return this.#current < this.#history.length;
    }

    redo():{index: number, prev: number, next: number}|null {
        if(this.canRedo) {
            this.#current += 1;
            return this.#history[this.#current - 1];
        }
        return null;
    }

    reset(): void {
        this.#history = [];
        this.#current = 0;
    }

    encode():string {
        const history = this.#history.filter((_, i) => i<this.#current);
        return JSON.stringify(history);
    }

    decode(json: string):void {
        this.reset();

        const history = JSON.parse(json);
        if(!Array.isArray(history)) {
            return;
        }

        for(let i=0; i<history.length; i++) {
            const index = history[i].index ?? null;
            const prev = history[i].prev ?? null;
            const next = history[i].next ?? null;
            if(!index || !prev || !next) {
                break;
            }
            this.#history.push({
                index,
                prev,
                next,
            });
        }
        this.#current = this.#history.length;
    }
}
