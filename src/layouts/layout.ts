import { State } from "../states/state";
import { ComponentInterface } from "./components/component-interface";
import { Board } from "./components/board";
import { Tenkey } from "./components/tenkey";
import { Timer } from "./components/timer";

export class Layout {
    #components: ComponentInterface[] = [];
    dom = document.createDocumentFragment();

    init(dataset: DOMStringMap): void {
        this.#components = [];
        this.dom.replaceChildren();

        if(dataset.timer !== undefined) {
            this.#components.push(new Timer());
        }

        this.#components.push(new Board());
        if(dataset.tenkey !== undefined) {
            this.#components.push(new Tenkey());
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
