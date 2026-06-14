export class Focus {
    #cursor: number|null = null;
    #tenkey: number|null = null;

    get cursor(): number|null { return this.#cursor }

    #valid(cursor: number|null, diff: number = 0): cursor is number {
        return (
            typeof cursor === 'number'
            && 0 <= cursor + diff
            && cursor + diff < 81);
    }

    set cursor(index:number|null) {
        if(this.#valid(index)) {
            this.#cursor = index;
        }else{
            this.#cursor = null;
        }
    }

    get tenkey(): number|null { return this.#tenkey }

    set tenkey(num: number|null) {
        if(typeof num === 'number' && 0 <= num && num <= 9) {
            this.#tenkey = num;
        }else{
            this.#tenkey = null;
        }
    }

    #add(diff:number):void {
        if(this.#valid(this.#cursor, diff)) {
            this.#cursor += diff;
        }
    }
    up():void { this.#add(-9); }
    right():void { this.#add(1); }
    down():void { this.#add(9); }
    left():void { this.#add(-1); }

    get row():number|null {
        if(!this.#cursor) return null;
        return Math.floor(this.#cursor / 9);
    }

    get col():number|null {
        if(!this.#cursor) return null;
        return this.#cursor % 9;        
    }
    
    isFocus(index: number): boolean { return (this.#cursor === index); }
}
