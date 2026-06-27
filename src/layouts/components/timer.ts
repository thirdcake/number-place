import { State } from "../../states/state";
import { ComponentInterface } from "./component-interface";

export class Timer implements ComponentInterface {
    dom = document.createElement('div');
    render(state: State): void {
    }
}
