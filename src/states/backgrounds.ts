import { Digits } from './digits';
import { Focus } from './focus';

export class Backgrounds {
    #blank = 'blank';
    #color = new Array(81).fill(this.#blank);
    

    reset(): void {
        this.#color = new Array(81).fill(this.#blank);
    }
    
    highlightNumber(digits: Digits, num: number, index:number|null = null): void {
        const focusColor = 'focus';
        const sameNumberColor = 'same-number';

        this.reset();

        if(num < 1 || 9 < num) return; 

        this.#color = digits.digits.map(digit => {
            if(digit.type === 'given' || digit.type === 'entry') {
                if(digit.int === num) {
                    return sameNumberColor;
                }
            }
            return this.#blank;
        });

        if(typeof index !== 'number' || index < 0 || 81 <= index) return;

        const focusDigit = digits.digits[index];
        if(focusDigit.type === 'given' || focusDigit.type === 'entry') {
            this.#color[index] = focusColor;
        }
    }

    checkDuplicate(digits: Digits): void {
        const duplicateColor = 'duplicate';

        this.reset();

        // ヨコチェック
        for(let row=0; row<9; row++) {
            const count:number[][] = new Array(9).fill(0).map(()=>([]));
            for(let col=0; col<9; col++) {
                const digit = digits.digits[row*9+col];
                if(digit.type === 'given' || digit.type === 'entry') {
                    count[digit.int - 1].push(row*9+col);
                }
            }
            count.forEach(cnt => {
                if(cnt.length > 1) {
                    cnt.forEach(idx => {
                        this.#color[idx] = duplicateColor;
                    });
                }
            });
        }

        // タテチェック
        for(let col=0; col<9; col++) {
            const count: number[][] = new Array(9).fill(0).map(()=>([]));
            for(let row=0; row<9; row++) {
                const digit = digits.digits[row*9+col];
                if(digit.type === 'given' || digit.type === 'entry') {
                    count[digit.int - 1].push(row*9+col);
                }
            }
            count.forEach(cnt => {
                if(cnt.length > 1) {
                    cnt.forEach(idx => {
                        this.#color[idx] = duplicateColor;
                    });
                }
            });
        }

        // ブロックチェック
        for(let b_row=0; b_row<3; b_row++) {
            for(let b_col=0; b_col<3; b_col++) {
                const count: number[][] = new Array(9).fill(0).map(()=>([]));
                for(let row=0; row<3; row++) {
                    for(let col=0; col<3; col++) {
                        const idx = b_row * 27 + b_col * 3 + row * 9 + col;
                        const digit = digits.digits[idx];
                        if(digit.type === 'given' || digit.type === 'entry') {
                            count[digit.int - 1].push(idx);
                        }
                    }
                }
                count.forEach(cnt => {
                    if(cnt.length > 1) {
                        cnt.forEach(idx => {
                            this.#color[idx] = duplicateColor;
                        });
                    }
                });
            }
        }
    }
}
