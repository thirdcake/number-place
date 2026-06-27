import { State } from "../../states/state";

export interface ComponentInterface {
    dom: HTMLElement | SVGElement;
    render(state: State): void;
}
