export class Tenkey {
    #dom = document.createElement('div') as HTMLDivElement;
    #icon = '/imgs/icon.svg';

    constructor() {
        this.#dom.classList.add('tenkey');
        const createButton = (id: string, int: number): string => [
            `<button type="button" data-digit="${ int }">`,
            '<svg width="16" height="16" viewBox="0 0 16 16">',
            `<use href="${ this.#icon }#${ id }"`,
            'x="0" y="0" width="16" height="16" fill="currentColor"/>',
            '</svg>',
            '</button>'
        ].join('');
        const buttons = new Array(10).fill(0)
            .map((_, i) => (i===0) ? 'clear' : `num-${i}`)
            .map(createButton)
            .join('');
        this.#dom.innerHTML = buttons;

    }
    get dom(): HTMLDivElement { return this.#dom }
    render(): void {}
}
