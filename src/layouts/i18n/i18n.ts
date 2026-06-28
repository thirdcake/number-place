// 1. ベースとなる翻訳データをただのオブジェクト（as const）として定義
const ja = {
    UNDO: '1手戻す',
    REDO: '1手進む',
    DELETE: '消す',
    CHECK: '重複チェック',
    SAVE: 'データ保存',
    CONFIRM_SAVE: '現在の盤面を保存しますか？',
    LOAD: 'データ読込',
    CONFIRM_LOAD: '保存した盤面を読み込みますか？',
    PEN: 'ペン入力',
    PENCIL: 'メモ入力',
    CELL_FIRST: 'マス▷数字',
    NUM_FIRST: '数字▷マス',
} as const;

// 2. 日本語のデータ構造から、自動的に型（キーの定義）を抽出
type TranslateKey = keyof typeof ja;

// 3. 他の言語は、日本語と同じキー構造であることを強制する
const en: Record<TranslateKey, string> = {
    UNDO: 'Undo',
    REDO: 'Redo',
    DELETE: 'Erase',
    CHECK: 'Check Errors',
    SAVE: 'Save Game',
    CONFIRM_SAVE: 'Save current board?',
    LOAD: 'Load Game',
    CONFIRM_LOAD: 'Load saved board?',
    PEN: 'Pen',
    PENCIL: 'Notes',
    CELL_FIRST: 'Cell ▷ Num',
    NUM_FIRST: 'Num ▷ Cell',
};

export class I18n {
    #word: Record<TranslateKey, string>;

    constructor(lang: string) {
        switch (lang) {
            case 'en':
                this.#word = en;
                break;
            case 'ja':
            default:
                this.#word = ja;
                break;
        }
    }

    // 4. 引数 `w` を string ではなく `TranslateKey` に限定する
    t(w: TranslateKey): string {
        return this.#word[w]; 
    }
}
