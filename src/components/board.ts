import { State } from '../states/state.ts';
import { Tenkey } from './tenkey.ts';
import { Cells } from './cells.ts';

export class Board {
    #dom: HTMLDivElement = document.createElement('div') as HTMLDivElement;
    #cells: Cells = new Cells();

    constructor() {
        this.#dom.appendChild(this.#cells.dom);
    }
    
    get dom():HTMLDivElement {
        return this.#dom;
    }

    render(state: State): void {
        this.#cells.render(state);
    }
}
