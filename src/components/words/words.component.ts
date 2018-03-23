import {Component} from '@angular/core';
import {WordsService} from '@services/words/words.service';
import {GameService} from '@services/game/game.service';
import {ALLPOKEMONS} from '@services/pokemon/pokemon.list';
import {pokemonsByRank} from '@services/pokemon/pokemon.level';

@Component({
    selector: 'words-component',
    templateUrl: './words.component.html',
    styleUrls: ['./words.component.css']

})
export class WordsComponent{
    public allWords;
    public usedWords = [];
    public rank = "";

    constructor(private _WordsService: WordsService, private _GameService: GameService){
        this.allWords = this._WordsService.getAllWords();
        //this.usedWords = this._WordsService.usedWords;

        const usedWordsSub = this._WordsService.usedWords$.subscribe(value =>{
            this.usedWords = value;
        });
    }

    wordClick(char){
       // console.log(char);
       if(this.usedWords.indexOf(char) < 0 && this._GameService.lives > 0){
        this.usedWords.push(char);
        }

        this._GameService.updateGame(char);


            //console.log(this.usedWords);
    }
}
