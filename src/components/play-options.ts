import { State } from '../states/state';

export class PlayOptions {
    #dom = document.createElement('div') as HTMLDivElement;
    #icon = '/imgs/icon.svg';
    #penMode = document.createElement('button') as HTMLButtonElement;
    #isPen = true;
    #firstMode = document.createElement('button') as HTMLButtonElement;
    #isCellFirst = true;
    
    constructor() {
        this.#penMode.innerHTML = this.#createSvg('')
    }
    
    #createSvg(id: string): string {
        return [
            '<svg width="16" height="16" viewBox="0 0 16 16">',
            `<use href="${ this.#icon }#${ id }"`,
            'x="0" y="0" width="16" height="16" fill="currentColor"/>',
            '</svg>',
        ].join('');
    }

    get dom(): HTMLDivElement { return this.#dom; }

    render(state: State): void {
        if(this.#isCellFirst === state.options.isCellFirst) {
        }
        if(this.#isPen === state.options.isPen) {
        }
    }
}
