export class Digit {
    #bit: number = 0;
    /**
     * this.#bit は、11bitで管理する
     * 上2桁はtypeで、下9桁がcandidatesのbitもしくはint(0,1,2,...9)
     * type:00 => candidates, 01 => entry, 10 => given
     * つまり、bit >> 9 === 0|1|2 で判別しやすい
     * 数値は、 bit & 0x1FF で、マスク可能
     */

    constructor(bit: number = 0) {
        this.bit = bit;
    }

    set bit(b: number) {
        this.#bit = b & 0x7FF;  // 0x7FF === (1<<11) - 1
    }
    get bit(): number { return this.#bit }

    // type は、3種類
    get type(): 'given'|'entry'|'candidates' {
        switch(this.#bit >> 9) {
            case 2:
                return 'given';
            case 1:
                return 'entry';
            case 0:
            default:
                return 'candidates';
        }
    }

    set given(int: number) {
        if(int < 0 || 9 < int) {
            int = 0;
        }
        this.bit = (int === 0) ? 0 : 0x400 + int;  // 0x400 === 1 << 10
    }
    get given(): number|null {
        const type_bit = this.#bit >> 9;
        if(type_bit !== 2) return null;
        return this.#bit & 0x1FF;  // 0x1FF === 2進数で1が9個
    }

    set entry(int: number) {
        if(int < 0 || 9 < int) {
            int = 0;
        }
        this.bit = (int === 0) ? 0 : 0x200 + int;  // 0x200 === 1 << 9
    }
    get entry(): number|null {
        const type_bit = this.#bit >> 9;
        if(type_bit !== 1) return null;
        return this.#bit & 0x1FF;
    }

    set candidates(bit: number) {
        if(bit < 0 || 0x1FF < bit) {
            bit = 0;
        }
        this.bit = bit;
    }
    get candidates(): number|null {
        const type_bit = this.#bit >> 9;
        if(type_bit !== 0) return null;
        return this.#bit;
    }

    toggleCandidate(int: number): void {
        if(int < 1 || 9 < int) return;
        if(this.type !== 'candidates') return;
        this.#bit ^= (1 << (int - 1));
    }
    hasCandidate(int: number): boolean {
        if(int < 0 || 9 < int) return false;
        if(this.type !== 'candidates') return false;
        return ((this.#bit & (1 << (int - 1))) > 0);
    }

    // データ保存用：16進法表記との変換
    set hex(h: string) {
        const bit = Number.parseInt(h, 16);
        this.bit = Number.isNaN(bit) ? 0 : bit;
    }
    get hex(): string {
        return this.#bit.toString(16).padStart(3, '0');
    }

}

export class Digits {
    #digits = new Array(81).fill(0).map(() => new Digit());
    #groups = this.#createGroups();
    // 同一行、同一列、同一ブロックの index の集合の集合
    #createGroups(): number[][] {
        const rows: number[][] = Array.from({ length: 9 }, () => []);
        const cols: number[][] = Array.from({ length: 9 }, () => []);
        const blocks: number[][] = Array.from({ length: 9 }, () => []);

        for (let i = 0; i < 81; i++) {
            const r = Math.floor(i / 9);  // タテ
            const c = i % 9; // ヨコ
            const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);  // ブロック

            rows[r].push(i);
            cols[c].push(i);
            blocks[b].push(i);
        }

        return [...rows, ...cols, ...blocks];
    }

    // 初期化
    set given(given_string: string) {
        if(/^[0-9]{81}$/.test(given_string)) {
            given_string.split('').forEach((s, i) => {
                this.#digits[i].given = Number(s);
            });
        }
    }
    set entry(entry_string: string) {
        if(/^[0-9a-fA-F]{243}$/.test(entry_string)) {
            for(let i=0; i<81; i++) {
                this.#digits[i].hex = entry_string.slice(i*3, i*3+3);
            }
        }
    }

    // stringify
    get given(): string {
        return (this.#digits
            .map(digit => (digit.type === 'given') ? digit.given : 0)
            .join(''));
    }
    get entry(): string {
        return this.#digits.map(digit => digit.hex).join('');
    }

    // getter
    get groups(): Digit[][] {
        return this.#groups.map(g => g.map(i => this.#digits[i]));
    }
    get digits(): Digit[] { return this.#digits }

}
