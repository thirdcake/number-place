import { Cell } from './cell';

export class Grid extends HTMLElement {
    static observedAttributes = ["bits", "backgrounds", "focus"];
    #cells: Cell[] = [];

    constructor() {
        super();
        const ns = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as SVGSVGElement;
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
        svg.setAttribute('viewBox', `0 0 ${ width } ${ width }`);

        // 外枠
        const outside_rect = document.createElementNS(ns, 'rect') as SVGRectElement;
        outside_rect.setAttribute('x', `${ margin + outside_line / 2 }`);
        outside_rect.setAttribute('y', `${ margin + outside_line / 2 }`);
        outside_rect.setAttribute('width', `${ width - margin * 2 - outside_line }`);
        outside_rect.setAttribute('height', `${ width - margin * 2 - outside_line }`);
        outside_rect.setAttribute('stroke', 'currentColor');
        outside_rect.setAttribute('stroke-width', `${ outside_line }`);
        outside_rect.setAttribute('fill', 'transparent');
        svg.appendChild(outside_rect);
        
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
            const line = document.createElementNS(ns, 'line') as SVGLineElement;
            line.setAttribute('x1', `${ pos[0] }`);
            line.setAttribute('x2', `${ pos[1] }`);
            line.setAttribute('y1', `${ pos[2] }`);
            line.setAttribute('y2', `${ pos[3] }`);
            line.setAttribute('stroke', 'currentColor');
            line.setAttribute('stroke-width', `${ thick_line }`);
            svg.appendChild(line);
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
            const line = document.createElementNS(ns, 'line') as SVGLineElement;
            line.setAttribute('x1', `${ pos[0] }`);
            line.setAttribute('x2', `${ pos[1] }`);
            line.setAttribute('y1', `${ pos[2] }`);
            line.setAttribute('y2', `${ pos[3] }`);
            line.setAttribute('stroke', 'currentColor');
            line.setAttribute('stroke-width', `${ thin_line }`);
            svg.appendChild(line);
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
        }, [] as number[]);
        for(let row=0; row<9; row++) {
            for(let col=0; col<9; col++) {
                const index = row * 9 + col;
                const cell = new Cell(
                    index,
                    cell_positions[col],
                    cell_positions[row],
                    cell_size,
                );
                this.#cells.push(cell);
                svg.appendChild(cell.dom);
            }
        }
        this.appendChild(svg);
    }

    connectedCallback(): void {
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if(oldValue === newValue) return;

        switch(name) {
            case 'bits':
                if(! /^[0-9]{243}$/.test(newValue)) return;
                for(let i=0; i<81; i++) {
                    const bit = Number(newValue.slice(i*3, (i+1)*3));
                    this.#cells[i].bit = bit;
                }
                break;
            case 'backgrounds':
                if(! /^[a-z]{81}$/.test(newValue)) return;
                newValue.split('').forEach((bg, i) => {
                    this.#cells[i].background = bg;
                });
                break;
            case 'focus':
                const focusIndex = Number(newValue);
                this.#cells.forEach((cell, i) => {
                    cell.isFocus = i === focusIndex;
                });
                break;
        }
    }

}