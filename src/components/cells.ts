import { State } from "../states/state.ts";

export class Cells {
    #ns = 'http://www.w3.org/2000/svg';
    #dom: SVGSVGElement = document.createElementNS(this.#ns, 'svg') as SVGSVGElement;
    #cells: SVGRectElement[] = new Array(81).fill(0)
        .map(x => (document.createElementNS(this.#ns, 'rect') as SVGRectElement));
    #digitStates: {type: string, int: number}[] = new Array(81).fill(0)
        .map(() => ({type: 'entry', int: 0}));
    #bgStates: string[] = new Array(81).fill(0)
        .map(() => 'blank');
    

    constructor() {
        this.#createDom();
    }

    get dom(): SVGSVGElement { return this.#dom }
    render(state: State): void {
        this.#cells.forEach((cell, idx) => {
            if(state.digits.digits[idx] !== this.#digitStates[idx]) {
                this.#digitStates[idx] = state.digits.digits[idx];
                this.#renderCellDigit(cell, this.#digitStates[idx]);
            }
            if(state.backgrounds.backgrounds[idx] !== this.#bgStates[idx]) {
                this.#bgStates[idx] = state.backgrounds.backgrounds[idx];
            }
        });
    }
    
    #renderCellDigit(cell:SVGRectElement, digit:{type:string,int:number}):void {
        
        switch(digit.type) {
            case 'given':
                break;
            case 'entry':
                break;
            case 'candidate':
                break;
        }
    }

    #createDom(): void {
        const cell_size = 48;
        const margin = 10;
        const outside_line = 6;
        const thick_line = 4;
        const thin_line = 2;
        const width = cell_size * 9
            + margin * 2
            + outside_line * 2
            + thick_line * 2
            + thin_line * 6;
        this.#dom.setAttribute('viewBox', `0 0 ${ width } ${ width }`);
        // 外枠
        const outside_rect = document.createElementNS(this.#ns, 'rect') as SVGRectElement;
        outside_rect.setAttribute('x', `${ margin + outside_line / 2 }`);
        outside_rect.setAttribute('y', `${ margin + outside_line / 2 }`);
        outside_rect.setAttribute('width', `${ width - margin * 2 - outside_line }`);
        outside_rect.setAttribute('height', `${ width - margin * 2 - outside_line }`);
        outside_rect.setAttribute('stroke', 'currentColor');
        outside_rect.setAttribute('stroke-width', `${ outside_line }`);
        outside_rect.setAttribute('fill', 'transparent');
        this.#dom.appendChild(outside_rect);
        
        // 太線
        const line_start = margin + outside_line / 2;
        const pos_thick_1 = margin + outside_line + cell_size * 3 + thin_line * 2 + thick_line / 2;
        const thick_positions = [
            [line_start, width - line_start, pos_thick_1, pos_thick_1],
            [line_start, width - line_start, width-pos_thick_1, width-pos_thick_1],
            [pos_thick_1, pos_thick_1, line_start, width-line_start],
            [width-pos_thick_1, width-pos_thick_1, line_start, width-line_start],
        ];
        thick_positions.forEach(pos => {
            const line = document.createElementNS(this.#ns, 'line') as SVGLineElement;
            line.setAttribute('x1', `${ pos[0] }`);
            line.setAttribute('x2', `${ pos[1] }`);
            line.setAttribute('y1', `${ pos[2] }`);
            line.setAttribute('y2', `${ pos[3] }`);
            line.setAttribute('stroke', 'currentColor');
            line.setAttribute('stroke-width', `${ thick_line }`);
            this.#dom.appendChild(line);
        });

        // 細線
        const pos_thin_1 = margin + outside_line + cell_size + thin_line / 2;
        const pos_thin_2 = margin + outside_line + cell_size * 2 + thin_line * 3 /2;
        const pos_thin_3 = margin + outside_line + cell_size * 4 + thin_line * 5 / 2 + thick_line;
        const pos_thin_4 = width - pos_thin_1;
        const pos_thin_5 = width - pos_thin_2;
        const pos_thin_6 = width - pos_thin_3;
        const thin_positions = [
            [line_start, width - line_start, pos_thin_1, pos_thin_1],
            [line_start, width - line_start, pos_thin_2, pos_thin_2],
            [line_start, width - line_start, pos_thin_3, pos_thin_3],
            [line_start, width - line_start, pos_thin_4, pos_thin_4],
            [line_start, width - line_start, pos_thin_5, pos_thin_5],
            [line_start, width - line_start, pos_thin_6, pos_thin_6],
            [pos_thin_1, pos_thin_1, line_start, width - line_start],
            [pos_thin_2, pos_thin_2, line_start, width - line_start],
            [pos_thin_3, pos_thin_3, line_start, width - line_start],
            [pos_thin_4, pos_thin_4, line_start, width - line_start],
            [pos_thin_5, pos_thin_5, line_start, width - line_start],
            [pos_thin_6, pos_thin_6, line_start, width - line_start],
        ];
        thin_positions.forEach(pos => {
            const line = document.createElementNS(this.#ns, 'line') as SVGLineElement;
            line.setAttribute('x1', `${ pos[0] }`);
            line.setAttribute('x2', `${ pos[1] }`);
            line.setAttribute('y1', `${ pos[2] }`);
            line.setAttribute('y2', `${ pos[3] }`);
            line.setAttribute('stroke', 'currentColor');
            line.setAttribute('stroke-width', `${ thin_line }`);
            this.#dom.appendChild(line);
        });

        // cell
        const cell_positions_diff = [
            margin + outside_line,
            cell_size + thin_line,
            cell_size + thin_line,
            cell_size + thick_line,
            cell_size + thin_line,
            cell_size + thin_line,
            cell_size + thick_line,
            cell_size + thin_line,
            cell_size + thin_line,
        ];
        const cell_positions = cell_positions_diff.reduce((arr, current)=>{
            const prev = arr.at(-1) ?? 0;
            arr.push(prev + current);
            return arr;
        }, []);
        this.#cells.forEach((cell, idx) => {
            const row = Math.floor(idx / 9);
            const col = idx % 9;
            cell.setAttribute('x', `${ cell_positions[col] }`);
            cell.setAttribute('y', `${ cell_positions[row] }`);
            cell.setAttribute('width', `${ cell_size }`);
            cell.setAttribute('height', `${ cell_size }`);
            cell.setAttribute('stroke', 'none');
            cell.setAttribute('fill', 'var(--numpre-blank)');
            cell.classList.add('cell');
            cell.dataset.index = `${ idx }`;
            this.#dom.appendChild(cell);
        });
    }
}
