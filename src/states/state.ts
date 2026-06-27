import { Digits } from "./digits";
import { Focus } from "./focus";

export class State {
    #isShowMode = false;  // show mode の場合、一切の state 更新をしない
    digits = new Digits();
    focus = new Focus();

    init(dataset: DOMStringMap): void {
        // layout に tenkey が無ければ show mode
        this.#isShowMode = dataset.tenkey === undefined;

        if(dataset.given !== undefined) {
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
}
