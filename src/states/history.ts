import { Focus } from "./focus";

type HistoryState = {
    index: number,
    prev: number,
    next: number,
}

export class History {
    #stuck: HistoryState[] = [];
    #current = 0;

    update(oldFocus: Focus, newFocus: Focus): void {
        if(oldFocus === newFocus) return;
        if(newFocus.isCellFirst) {
            if(oldFocus.index !== newFocus.index) {
                return;
            }
        }else{
            if(oldFocus.bit !== newFocus.bit) {
                return;
            }
        }
        const index = newFocus.index;
        const prev = oldFocus.bit;
        const next = newFocus.bit;
        if(index === null || prev === null || next === null) {
            return;
        }
        const state: HistoryState = {
            index,
            prev,
            next,
        }
        this.#stuck = this.#stuck.filter((_, i) => i < this.#current);
        this.#stuck.push(state);
        this.#current = this.#stuck.length;
    }

    get canUndo(): boolean {
        return this.#current > 0;
    }
    undo(): HistoryState|null {
        if(this.canUndo) {
            this.#current -= 1;
            return this.#stuck[this.#current];
        }
        return null;
    }

    get canRedo(): boolean {
        return this.#current < this.#stuck.length;
    }
    redo(): HistoryState|null {
        if(this.canRedo) {
            this.#current += 1;
            return this.#stuck[this.#current - 1];
        }
        return null;
    }
}