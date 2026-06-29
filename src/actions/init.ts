import { State } from "../states/state";
import { Layout } from "../layouts/layout";

export class Init {

    static initState(dataset: DOMStringMap): State {
        const state = new State();

        if(dataset.entry !== undefined
            && /^[0-9a-fA-F]{243}$/.test(dataset.entry)) {
            state.digits.entry = dataset.entry;
            
        }else if(dataset.given !== undefined
            && /^[0-9]{81}$/.test(dataset.given)){
            dataset.given.split('').forEach((s, i) => {
                state.digits[i].given = Number(s);
            });
        }

        return state;
    }
    static initLayout(dataset: DOMStringMap): Layout {
        const layout = new Layout();
        return layout;
    }
}
