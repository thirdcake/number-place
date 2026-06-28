import { Digits } from "./digits";
import { Focus } from "./focus";

export class State {
    #isShowMode = false;  // show mode の場合、一切 state 更新しない
    digits = new Digits();
    focus = new Focus();

    init(dataset: DOMStringMap): void {
        // layout に tenkey が無ければ show mode
        this.#isShowMode = dataset.tenkey === undefined;

        if(dataset.entry !== undefined) {
            this.digits.entry = dataset.entry;
        }else if(dataset.given !== undefined) {
            this.digits.given = dataset.given;
        }
    }
    blur(): void {
        if(this.#isShowMode) return;
    }
    clickCell(index: number): void {
        if(this.#isShowMode) return;
    }
    clickNum(digit: number): void {
        if(this.#isShowMode) return;
    }
    clickOpt(option: string): void {
        if(this.#isShowMode) return;
    }
    moveFocus(key: string): void {
        if(this.#isShowMode) return;
    }
    inputCandidate(digit: number): void {
        if(this.#isShowMode) return;
    }
    inputNumber(digit: number): void {
        if(this.#isShowMode) return;
    }
    isOptionButtonDisabled(option: string): boolean {
        switch(option) {
            // 常に click 可能
            case 'delete':
            case 'check':
            case 'save':
                return false;
            // 状況によりけり
            case 'undo':
                // return !this.#history.canUndo;
            case 'redo':
                // return !this.#history.canRedo;
            case 'load':
                // return this.???.hasSaveData;
            case 'pen':
                // return !this.#focus.penMode;
            case 'pencil':
                // return this.#focus.penMode;
            case 'cell_first':
                // return !this.#cellFirst;
            case 'num_first':
                // return this.#cellFirst;
            // 指定したもの以外はすべて disabled
            default:
                return true;
        }
    }
}
