import {Injectable} from "@angular/core";
import { Subject } from "rxjs/Subject";

import {PokemonService} from "@services/pokemon/pokemon.service";
import { WordsService } from "@services/words/words.service";
import {ScoreService} from '@services/score/score.service';


//import { PokemonService } from "../pokemon/pokemon.service";

@Injectable()
export class GameService{
    public gamePokemon : any;
    public gameWord: any;
    public restart = new Subject<boolean>();//boolean;
    public restart$;
    public MAXLIVES = 6;
    
    public score: any;
    public lives: any;
    public level: any;

    constructor(private _PokemonService : PokemonService,
                private _WordsService: WordsService,
                private _ScoreService: ScoreService
                ){

        this.score = 0;
        this.lives = 2;
        this.level = 1; 

        this.gamePokemon = this._PokemonService.getRandPokemon(this.level, this.gamePokemon);
        this.gameWord = this._WordsService.getDashArray(this.gamePokemon);

        this.restart$ = this.restart.asObservable(); //Has a $
        console.log(this.gamePokemon);


        this._ScoreService.updateScoreSubject(this.score);
        this._ScoreService.updateLivesSubject(this.lives);
        this._ScoreService.updateLevelSubject(this.level);
    }

    updateGame(char){
        if(this.lives == 0) return;

        if(this.gamePokemon.indexOf(char) > -1){
            this.updateGameWord(char);
        }
        else{
            this.updateLives();
        }

        if(this.gameWord.indexOf("-") < 0){
            this.updateScore();
        }
    }
    
    updateGameWord(char){
        for(let i = 0; i < this.gameWord.length; i++){
            if(this.gamePokemon[i] == char){
                this.gameWord[i] = char;
            }
        }
        //console.log(this.gameWord);
        //this._WordsService.updateWordSubject(this.gameWord);        
    }

    updateScore(){
        this.score += this.gameWord.length;
        this._ScoreService.updateScoreSubject(this.score);
        this.updateLevel();
        
        this.resetGame();
        
    }

    updateLevel(){
        if(this.score > 75){
            this.level = 5;
        }
        else if(this.score > 40){
            this.level = 4;
        }
        else if(this.score > 25){
            this.level = 3;
        }
        else if(this.score > 10){
            this.level = 2; 
        }
        this._ScoreService.updateLevelSubject(this.level);
    }

    updateLives(){
        console.log("hre");
        if(this.lives == 1){
            this.updateRestartSubject(true);
        }
        this.lives--;
        this._ScoreService.updateLivesSubject(this.lives);

    }

    resetGame(){
        this.gamePokemon = this._PokemonService.getRandPokemon(this.level, this.gamePokemon);
        this.gameWord = this._WordsService.getDashArray(this.gamePokemon);
        this._ScoreService.updateLivesSubject(this.MAXLIVES);
        this._WordsService.updateGameWord(this.gameWord);
        this._WordsService.resetWords();
        this.lives = this.MAXLIVES;
        
        console.log(this.gamePokemon);
    }

    updateRestartSubject(value : boolean){
        this.restart.next(value);
    }

    restartGame(){
        this._ScoreService.updateScoreSubject(0);
        this._ScoreService.updateLevelSubject(1);
        this.updateRestartSubject(false);

        this.score = 0; 
        this.level = 1;

        this.resetGame();
    }

}