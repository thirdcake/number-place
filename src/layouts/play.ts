import { State } from '../states/state';
import { PrevNext } from '../components/prev-next';
import { Board } from '../components/board';
import { Tenkey } from '../components/tenkey';
import { PlayOptions } from '../components/play-options';

export class NumprePlay extends HTMLElement {
    #state = new State();
    #components = [
        new PrevNext(),
        new Board(),
        new Tenkey(),
        new PlayOptions(),
    ];
    constructor(){
        super()
    }
    connectedCallback(): void {
        const given = this.getAttribute('given');
        const entry = this.getAttribute('entry');
        this.#state.init(given, entry);
        this.#components.forEach(comp => {this.appendChild(comp.dom)});

        this.addEventListener('click', this.#handleNumpreClick);
        this.addEventListener('keydown', this.#handleNumpreKeydown);
    }

    disconnectedCallback(): void {
        this.removeEventListener('click', this.#handleNumpreClick);
        this.removeEventListener('keydown', this.#handleNumpreKeydown);
    }

    #handleNumpreClick = ((e: PointerEvent) => {
        const target = e.target as HTMLElement | null;
        if(!target) return;

        const cell = target.closest('rect[data-index]');
        const num = target.closest('button[data-digit]');
        const opt = target.closest('button[data-option]');
        
        if (!cell && !num && !opt) return;

        if(cell && cell instanceof SVGElement) {
            if(cell.dataset.index) {
                const index = Number(cell.dataset.index);
                this.#state.clickCell(index);
            }
        }else if(num && num instanceof HTMLElement) {
            if(num.dataset.digit) {
                const digit = Number(num.dataset.digit);
                this.#state.clickNum(digit);
            }
        }else if(opt && opt instanceof HTMLElement) {
            if(opt.dataset.option) {
                this.#state.clickOpt(opt.dataset.option);
            }
        }
        this.#components.forEach(comp => {comp.render(this.#state)});
    }) as EventListener;
    
    #handleNumpreKeydown = ((e: KeyboardEvent) => {
        const key = e.key;

        const isArrowKey = [
            'ArrowUp', 
            'ArrowDown', 
            'ArrowLeft', 
            'ArrowRight'
        ].includes(key);
        
        if(isArrowKey) {
            e.preventDefault();
            this.#state.moveFocus(key);
            this.#components.forEach(comp => {comp.render(this.#state)});
            return;
        }

        const isNumber = /^[1-9]$/.test(key);
        const isDelete = ['Backspace', 'Delete', '0'].includes(key);
        const isShift = e.shiftKey;

        if(isNumber || isDelete) {
            e.preventDefault();

            const value = isDelete ? 0 : Number(key);
            if(isShift) {
                this.#state.inputCandidate(value);
            }else{
                this.#state.inputNumber(value);
            }
            this.#components.forEach(comp => {comp.render(this.#state)});
            return;
        }
    }) as EventListener;
}
