import { State } from "../states/state";
import { ComponentInterface } from "./components/component-interface";
import { Board } from "./components/board";
import { Tenkey } from "./components/tenkey";
import { Timer } from "./components/timer";
import { Options } from "./components/options";
import { I18n } from "./i18n/i18n";

export class Layout {
    #components: ComponentInterface[] = [];
    #i18n: I18n;
    dom = document.createDocumentFragment();

    init(dataset: DOMStringMap): void {
        this.#i18n = new I18n(dataset.lang ?? 'ja');

        this.#components = [];
        this.dom.replaceChildren();

        if(dataset.timer !== undefined) {
            this.#components.push(new Timer());
        }

        this.#components.push(new Board());
        if(dataset.tenkey !== undefined) {
            this.#components.push(new Tenkey());
        }
        if(dataset.options !== undefined) {
            this.#components.push(new Options(dataset.options, this.#i18n));
        }

        this.#components.forEach(comp => {
            this.dom.appendChild(comp.dom);
        });
    }

    render(state: State): void {
        this.#components.forEach(comp => {
            comp.render(state);
        });
    }
}
