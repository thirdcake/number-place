export class Cell {
    #state = {
        bit: 0,
        background: 'blank',
        isFocus: false,
    }
    #dom: SVGGElement;
    #rect: SVGRectElement;
    #nums: SVGUseElement[];
    #candidates: SVGUseElement[];

    #entry_zero = 1 << 9;  // candidate の最大値 + 1 === entry の 0
    #given_zero = this.#entry_zero + 10;  // entry の最大値 + 1 === given の 0

    constructor(index: number, x: number, y: number, size: number) {
        const ns = 'http://www.w3.org/2000/svg';
        this.#dom = document.createElementNS(ns, 'g') as SVGGElement;

        this.#rect = document.createElementNS(ns, 'rect') as SVGRectElement;
        this.#rect.setAttribute('fill', 'transparent');
        this.#rect.setAttribute('stroke', 'transparent');
        this.#rect.setAttribute('stroke-width', '3');
        this.#rect.setAttribute('x', `${ x }`);
        this.#rect.setAttribute('y', `${ y }`);
        this.#rect.setAttribute('width', `${ size }`);
        this.#rect.setAttribute('height', `${ size }`);
        this.#dom.appendChild(this.#rect);

        this.#nums = new Array(9).fill(0).map((_, i) => {
            const use = document.createElementNS(ns, 'use') as SVGUseElement;
            use.setAttribute('href', `/imgs/icon.svg#num-${ i+1 }`);
            use.setAttribute('x', `${ x }`);
            use.setAttribute('y', `${ y }`);
            use.setAttribute('width', `${ size }`);
            use.setAttribute('height', `${ size }`);
            return use;
        });
        this.#nums.forEach(num => { this.#dom.appendChild(num) });

        this.#candidates = new Array(9).fill(0).map((_, i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const use = document.createElementNS(ns, 'use') as SVGUseElement;
            use.setAttribute('href', `/imgs/icon.svg#num-${ i+1 }`);
            use.setAttribute('x', `${ row * 16 }`);
            use.setAttribute('y', `${ col * 16 }`);
            use.setAttribute('width', `${ Math.floor(size / 3) }`);
            use.setAttribute('height', `${ Math.floor(size / 3) }`);
            return use;
        });
        this.#candidates.forEach(can => { this.#dom.appendChild(can) });
    }

    get dom() { return this.#dom; }

    set bit(bi: number) {
        if(bi < 0 || this.#given_zero + 9 < bi) return;
        if(this.#state.bit === bi) return;
        this.#state.bit = bi;
        this.#nums.forEach(num => {
            num.setAttribute('fill', 'transparent');
            num.setAttribute('stroke', 'transparent');
            num.setAttribute('stroke-width', 'transparent');
        });
        this.#candidates.forEach(can => {
            can.setAttribute('fill', 'transparent');
            can.setAttribute('stroke', 'transparent');
            can.setAttribute('stroke-width', 'transparent');
        });
        if(this.#state.bit < this.#entry_zero) {

        }else if(this.#state.bit < this.#given_zero) {

        }else {

        }
    }

    set background(bg: string) {
        if(this.#state.background === bg) return;
        this.#state.background = bg;

    }

    set isFocus(bl: boolean) {
        if(this.#state.isFocus === bl) return;
        this.#state.isFocus = bl;
    }
}