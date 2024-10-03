import path from 'path';
import Typo from 'typo-js';

export class WordValidator {
    private langs: string[];
    private dictionaries: Typo[];

    constructor(langs: string[]) {
        this.langs = langs;
        this.dictionaries = this.loadDictionaries();
    }

    private loadDictionaries(): Typo[] {
        // console.time('ruDictionaryDownloadTime');
        // const ruDictionary = new Typo("ru_RU", null, null, { dictionaryPath: path.join(__dirname, 'dictionaries') })
        // const isRuCorrectly = ruDictionary.check("Американский");
        // console.log(isRuCorrectly);
        // console.timeEnd('ruDictionaryDownloadTime');
        const availableDictionaries = ['en_US', 'ru_RU'];

        const dictionaries = availableDictionaries.map(
            (lang: string) => new Typo(lang, null, null, { dictionaryPath: path.join(__dirname, 'dictionaries') })
        );
        console.time('enDictionaryDownloadTime');
        const enDictionary = new Typo('en_US', null, null, { dictionaryPath: path.join(__dirname, 'dictionaries') });
        const isEnCorrectly = enDictionary.check('Russian');
        console.log(isEnCorrectly);
        console.timeEnd('enDictionaryDownloadTime');

        return dictionaries;
    }

    public getDictionaries(dictionaries: string): Typo[] {
        return this.dictionaries;
    }

    public checkRuWord(word: string): Boolean {
        const isCorrectly = enDictionary.check(word);;
        return isCorrectly;
    }

    public checkEnWord(word: string): Boolean {
        const isCorrectly = enDictionary.check(word);;
        return isCorrectly;
    }
}
