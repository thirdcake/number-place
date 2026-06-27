import { State } from "../../states/state";
import { ComponentInterface } from "./component-interface";

export class Board implements ComponentInterface {
    #ns = 'http://www.w3.org/2000/svg';
    dom = document.createElementNS(this.#ns, 'svg') as SVGSVGElement;
    render(state: State): void {
    }
}
