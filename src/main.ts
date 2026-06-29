import { State } from "./states/state";
import { Routes } from "./actions/routes";
import { Init } from "./actions/init";
import { Layout } from "./layouts/layout";

customElements.define('number-place', class extends HTMLElement {
    #state = new State();
    #layout = new Layout();

    connectedCallback(): void {
        if(!this.hasAttribute('tabindex')) {
            this.setAttribute('tabindex', '0');
        }
        this.#state = Init.initState(this.dataset);
        this.#layout = Init.initLayout(this.dataset);
        this.appendChild(this.#layout.dom);
        this.#layout.render(this.#state);

        this.addEventListener('click', this.#handleNumpreClick, false);
        this.addEventListener('keydown', this.#handleNumpreKeydown, false);
    }

    disconnectedCallback(): void {
        this.removeEventListener('click', this.#handleNumpreClick);
        this.removeEventListener('keydown', this.#handleNumpreKeydown);
    }

    #handleNumpreClick = (e: MouseEvent) => {
        if(this.#state.isProcessing) return;
        this.#state.isProcessing = true;
        this.#state = Routes.clickEvent(e, this.#state);
        this.#layout.render(this.#state);
        this.#state.isProcessing = false;
    };

    #handleNumpreKeydown = (e: KeyboardEvent) => {
        if(this.#state.isProcessing) return;
        this.#state.isProcessing = true;
        this.#state = Routes.keydownEvent(e, this.#state);
        this.#layout.render(this.#state);
        this.#state.isProcessing = false;
    };
});
