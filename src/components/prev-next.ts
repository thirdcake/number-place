import { State } from '../states/state';

export class PrevNext {
    #dom = document.createElement('div') as HTMLDivElement;
    get dom(): HTMLDivElement { return this.#dom; }
    render(state: State): void {
    }
}
