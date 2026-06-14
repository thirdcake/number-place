import { State } from "../states/state.ts";

export class Actions {
    static clickCell(state:State, index:number):State {
        return state;
    }
    static clickNum(state:State, digit:number):State {
        return state;
    }
    static clickOpt(state:State, option:string):State {
        return state;
    }
    static moveFocus(state:State, key:string):State {
        return state;
    }
    static inputCandidate(state:State, key:number) {
        return state;
    }
    static inputNumber(state:State, key:number) {
        return state;
    }
}
