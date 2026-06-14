import { Digits } from './digits.ts';
import { Backgrounds } from './backgrounds.ts';
import { History } from './history.ts';
import { Focus } from './focus.ts';
import { Options } from './options.ts';

export class State {
    #digits: Digits = new Digits();
    #backgrounds: Backgrounds = new Backgrounds();
    #history: History = new History();
    #focus: Focus = new Focus();
    #options: Options = new Options();

    init(given: unknown, entry: unknown):void {
        this.#digits.init(given, entry);
    }
    
    get digits():Digits { return this.#digits }
    get backgrounds(): Backgrounds { return this.#backgrounds }
    get history(): History { return this.#history }
    get focus(): Focus { return this.#focus }
    get options(): Options { return this.#options }
    
    clickCell(index: number): void {
        if(this.#options.isCellFirst) {
            this.#focus.cursor = index;
            this.#backgrounds.highlightNumber(this.#digits, this.#focus);
        }else{
            if(this.#options.isPen) {
            }else{
            }
        }
    }
    clickNum(digit: number): void {
        if(this.#options.isNumFirst) {
            this.#backgrounds.highlightNumber(this.#digits, this.#focus);
        }else {
            if(this.#options.isPen) {
                this.inputNumber(digit);
            }else{
                this.inputCandidate(digit);
            }
        }
    }

    clickOpt(option: string): void {
        switch(option) {
            case 'undo':
                const undo = this.#history.undo();
                if(!undo) return;
                this.#digits.setBit(undo.index, undo.prev);
                break;
            case 'redo':
                const redo = this.#history.redo();
                if(!redo) return;
                this.#digits.setBit(redo.index, redo.next);
                break;
            case 'pen-mode':
                this.#options.togglePenMode();
                break;
            case 'first-mode':
                this.#options.toggleFirstMode();
                break;
        }
    }

    moveFocus(key: string): void {
        switch (key) {
            case 'ArrowUp':
                this.#focus.up();
                break;
            case 'ArrowDown':
                this.#focus.down();
                break;
            case 'ArrowLeft':
                this.#focus.left();
                break;
            case 'ArrowRight':
                this.#focus.right();
                break;
        }
    }

    inputCandidate(int: number): void {
        const index = this.#focus.cursor;
        if(!index) return;
        const prev = this.#digits.getBit(index);
        this.#digits.toggleCandidate(index, int);
        const next = this.#digits.getBit(index);
        if(prev !== next) {
            this.#history.save(index, prev, next);
        }
    }

    inputNumber(int: number): void {
        const index = this.#focus.cursor;
        if(!index) return;
        const prev = this.#digits.getBit(index);
        this.#digits.setEntry(index, int);
        const next = this.#digits.getBit(index);
        if(prev !== next) {
            this.#history.save(index, prev, next);
        }
    }
}
