import {Injectable} from "@angular/core";
import {ALLWORDS} from "./words.list";
import { Subject } from "rxjs/Subject";


@Injectable()
export class WordsService{
    public usedWords = new Subject<any>();
    public gameWord = new Subject<any>();

    public gameWord$;
    public usedWords$;
    
    constructor(){
        this.gameWord$ = this.gameWord.asObservable();
        this.usedWords$ = this.usedWords.asObservable();
    }

    getAllWords(){
        return ALLWORDS;
    }
    
    getDashArray(str){
        var ans = [];
        for(let i = 0; i < str.length; i++){
            ans.push("-");
        }
        return ans;
    }

    updateGameWord(value){
        this.gameWord.next(value);
    }

    resetWords(){
        this.usedWords.next([]);
    }
}
