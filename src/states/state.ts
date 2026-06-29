import { Digits } from "./digits";
import { Focus } from "./focus";
import { History } from "./history";

export class State {
    #isShowMode = false;  // show mode の場合、一切 state 更新しない
    digits = new Digits();
    focus = new Focus();
    history = new History();

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
        let enabled = false;
        switch(option) {
            // 常に click 可能
            case 'delete':
            case 'check':
            case 'save':
                enabled = true;
                break;
            // 状況によりけり
            case 'undo':
                enabled = this.history.canUndo;
                break;
            case 'redo':
                enabled = this.history.canRedo;
                break;
            case 'load':
                // enabled = this.???.hasSaveData; break;
            case 'pen':
                // enabled = this.focus.penMode; break;
            case 'pencil':
                // enabled = this.focus.penMode; break;
            case 'cell_first':
                enabled = this.focus.isCellFirst;
                break;
            case 'num_first':
                enabled = !this.focus.isCellFirst;
                break;
            // 指定したもの以外はすべて disabled
            default:
                break;
        }
        return !enabled;  // disabled なので反転させる
    }
}
