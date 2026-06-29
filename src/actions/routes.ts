import { State } from "../states/state";
import { checkDuplicate } from "./check";
import { focusCell, focusNum, focusOut } from "./focus";
import { undo, redo, save, load } from "./history";
import { updateCandidate, updateEntry, updateGiven } from "./update";

export class Routes {
    static clickEvent(e: MouseEvent, state: State): State {
        const target = e.target as HTMLElement | SVGElement | null;
        if(!target) return state;

        const cell = target.closest('rect[data-index]') as SVGElement;
        const num = target.closest('button[data-digit]') as HTMLElement;
        const opt = target.closest('button[data-option]') as HTMLElement;

        if(cell && cell.dataset.index !== undefined) {
            // cell が click された
            const index = Number(cell.dataset.index);
            if(state.options.cellFirst) {
                return focusCell(index, state);
            }else{
                switch(state.mode) {
                    case 'make':
                        return updateGiven(state);
                    case 'play':
                        return (state.options.penMode
                            ? updateEntry(state)
                            : updateCandidate(state));
                    default:
                        return state;
                }
            }
        }else if(num && !!num.dataset.digit) {
            // num が click された
            const digit = Number(num.dataset.digit);
            if(state.options.numFirst) {
                return focusNum(digit, state);
            }else{
                switch(state.mode) {
                    case 'make':
                        return updateGiven(state);
                    case 'play':
                        return (state.options.penMode
                            ? updateEntry(state)
                            : updateCandidate(state));
                    default:
                        return state;
                }
            }
        }else if(opt && !!opt.dataset.option) {
            switch(opt.dataset.option) {
                case 'undo':
                case 'redo':
                case 'save':
                case 'load':
                default:
                    return state;
            }
        }else {
            return focusOut(state);
        }
    }
    static keydownEvent(e: KeyboardEvent, state: State): State {
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
            let index = state.focus.index;
            if(index === null) {
                return state;
            }
            const row = Math.floor(index / 9);
            const col = index % 9;
            switch(key) {
                case 'ArrowUp':
                    index = ((row + 9 - 1) % 9) * 9 + col;
                case 'ArrowDown':
                    index = ((row + 1) % 9) * 9 + col;
                case 'ArrowLeft':
                    index = row * 9 + (col + 9 - 1) % 9;
                case 'ArrowRight':
                    index = row * 9 + (col + 1) % 9;
                default:
            }
            return focusCell(index, state);
        }else if(isNumber || isDelete) {
            e.preventDefault();
            const digit = isDelete ? 0 : Number(key);
            switch(state.mode) {
                case 'make':
                    return updateGiven(state);
                case 'play':
                    if(isShift) {
                        return updateCandidate(state);
                    }
                    return updateEntry(state);
                default:
                    return state;
            }
        }
        return state;
    }
}
