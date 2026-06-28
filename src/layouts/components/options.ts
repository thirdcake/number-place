import { State } from "../../states/state";
import { ComponentInterface } from "./component-interface";
import { I18n } from "../i18n/i18n";

export class Options implements ComponentInterface {
    dom = document.createElement('div');
    #buttons: HTMLButtonElement[] = [];

    constructor(options: string, i18n: I18n) {
        this.#buttons = this.#createButtons(options, i18n);
        this.#buttons.forEach(button => {
            this.dom.appendChild(button);
        });
    }

    #createButtons(options_string: string, i18n: I18n): HTMLButtonElement[] {
        const optionMap = {
            undo: 'UNDO',
            redo: 'REDO',
            delete: 'DELETE',
            check: 'CHECK',
            save: 'SAVE',
            load: 'LOAD',
            pen: 'PEN',
            pencil: 'PENCIL',
            cell_first: 'CELL_FIRST',
            num_first: 'NUM_FIRST',
        }
        return options_string.split(/\s+/).map(option => {
            const button = document.createElement('button') as HTMLButtonElement;
            button.type = 'button';
            const textContent = optionMap[option];
            if(!textContent) {
                console.error('data-option Error: ' + option);
                return null;
            }
            button.dataset.option = option;
            button.textContent = i18n.t(textContent);
            return button;
        }).filter(button => button !== null);
    }

    render(state: State): void {
        this.#buttons.forEach(button => {
            button.disabled = state.isOptionButtonDisabled(button.dataset.option ?? '');
        });
    }
}
