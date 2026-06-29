import { State } from "../states/state";

export function focusCell(index: number, state: State): State {
    state.focus.index = index;
    return state;
}

export function focusNum(num: number, state: State): State {
    state.focus.num = num;
    return state;
}

export function focusOut(state: State): State {
    state.focus.index = null;
    state.focus.num = null;
    return state;
}
