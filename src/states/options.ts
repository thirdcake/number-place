export class Options {
    penMode = true;
    get pencilMode(): boolean { return !this.penMode; }
    set pencilMode(bl: boolean) {
        this.penMode = !bl;
    }

    cellFirst = true;
    get numFirst(): boolean { return !this.cellFirst; }
    set numFirst(bl: boolean) {
        this.cellFirst = !bl;
    }
}
