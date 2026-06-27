import { State } from "./states/state";
import { Layout } from "./layouts/layout";

customElements.define('number-place', class extends HTMLElement {
    #state = new State();
    #layout = new Layout();

    connectedCallback(): void {
        if(!this.hasAttribute('tabindex')) {
            this.setAttribute('tabindex', '0');
        }
        this.#state.init(this.dataset);
        this.#layout.init(this.dataset);
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
        const target = e.target as HTMLElement | SVGElement | null;
        if(!target) return;

        const cell = target.closest('rect[data-index]') as SVGElement;
        const num = target.closest('button[data-digit]') as HTMLElement;
        const opt = target.closest('button[data-option]') as HTMLElement;

        if(cell && !!cell.dataset.index) {
            const index = Number(cell.dataset.index);
            this.#state.clickCell(index);
        }else if(num && !!num.dataset.digit) {
            const digit = Number(num.dataset.digit);
            this.#state.clickNum(digit);
        }else if(opt && !!opt.dataset.option) {
            this.#state.clickOpt(opt.dataset.option);
        }else {
            this.#state.blur();
        }
        this.#layout.render(this.#state);
    };

    #handleNumpreKeydown = (e: KeyboardEvent) => {
        const key = e.key;

        const isArrowKey = [
            'ArrowUp', 
            'ArrowDown', 
            'ArrowLeft', 
            'ArrowRight'
        ].includes(key);
        const isNumber = /^[1-9]$/.test(key);
        const isDelete = ['Backspace', 'Delete', '0'].includes(key);
        const isShift = e.shiftKey;

        if(isArrowKey) {
            e.preventDefault();
            this.#state.moveFocus(key);
        }else if(isNumber || isDelete) {
            e.preventDefault();
            const digit = isDelete ? 0 : Number(key);
            if(isShift) {
                this.#state.inputCandidate(digit);
            }else{
                this.#state.inputNumber(digit);
            }
        }
        this.#layout.render(this.#state);
    };
});
