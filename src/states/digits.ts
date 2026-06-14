export class Digits {
    #digits = new Array(81).fill(0).map(() => ({type: 'entry', int: 0}));
    #entry_zero = 1 << 9;  // candidates の最大値。これを超えたら entry
    #given_zero = this.#entry_zero + 10;  // entry の最大値。これを超えたら given

    reset(): void {
        this.#digits = new Array(81).fill(0).map(() => ({type: 'entry', int: 0}));
    }

    init(given: unknown, entry: unknown): void {
        this.reset();

        // given が不正なら早期リターン
        if(typeof given !== 'string' || /^[0-9]{81}$/.test(given)) return;

        const givens = given.split('').map(Number);
        this.#digits = givens.map((int, idx) => {
            if(int > 0) {
                return { type: 'given', int }
            }
            return this.#digits[idx];
        });
        
        // entry が不正なら早期リターン
        if(typeof entry !== 'string' || /^[0-9]{243}$/.test(entry)) return;
        
        this.#digits = this.#digits.map((d, i) => {
            if(d.type === 'given') return d;
            const bit = Number(entry.slice(i*3, (i+1)*3));
            return this.#formatDigit(bit);
        });
    }
    
    #formatBit(digit: {type: string, int: number}): number {
        switch(digit.type) {
            case 'given':
                return digit.int + this.#given_zero;
            case 'entry':
                return digit.int + this.#entry_zero;
            case 'candidate':
            default:
                return digit.int;
        }
    }
    
    #formatDigit(bit: number): {type: string, int: number} {
        if(bit > this.#given_zero) {
            return {
                type: 'given',
                int: bit - this.#given_zero,
            }
        }else if(bit > this.#entry_zero) {
            return {
                type: 'entry',
                int: bit - this.#entry_zero,
            }
        }
        return {
            type: 'candidate',
            int: bit,
        }
    }

    getBit(index: number): number {
        return this.#formatBit(this.#digits[index]);
    }

    setBit(index:number, bit:number): void {
        this.#digits[index] = this.#formatDigit(bit);
    }

    get digits(): {type: string, int: number}[] {
        return this.#digits;
    }

    isSameDigit(index: number, digit:{type: string, int: number}): boolean {
        return this.#formatBit(digit) === this.#formatBit(this.#digits[index]);
    }

    setGiven(index: number, int: number): void {
        if(index < 0 || 81 <= index) return;
        if(int < 0 || 9 < int) return;
        this.#digits[index] = { type: 'given', int }
    }

    setEntry(index: number, int: number): void {
        if(index < 0 || 81 <= index) return;
        if(int < 0 || 9 < int) return;
        const digit = this.#digits[index];
        if(digit.type === 'given') return;
        this.#digits[index] = { type: 'entry', int }
    }

    setCandidate(index: number, int: number): void {
        if(index < 0 || 81 <= index) return;
        if(int < 0 || this.#entry_zero < int) return;
        this.#digits[index] = {type: 'candidate', int }
    }

    toggleCandidate(index: number, num: number): void {
        if(index < 0 || 81 <= index) return;
        if(num < 1 || 9 < num) return;
        const digit = this.#digits[index];
        if(digit.type !== 'candidate') return;
        const int = digit.int ^ (1 << (num-1));
        this.#digits[index] = { type:'candidate', int }
    }

    get givenString(): string {
        return (this.#digits
            .map(d => d.type === 'given' ? d.int : 0)
            .join(''));
    }
    
    get entryString(): string {
        return (this.#digits
            .map(d => d.type === 'given' ? 0 : this.#formatBit(d))
            .map(b => String(b).padStart(3, '0'))
            .join(''));
    }
}
