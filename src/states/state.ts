import { Digits } from "./digits";
import { Focus } from "./focus";
import { History } from "./history";
import { Options } from "./options";

export class State {
    isProcessing = false;  // 処理中かどうか
    mode: 'show'|'make'|'play' = 'play';

    digits = new Digits();
    focus = new Focus();
    history = new History();
    options = new Options();

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
