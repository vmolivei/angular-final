import {Component} from '@angular/core';
import {GameService} from '@services/game/game.service'
import { ScoreService } from '@services/score/score.service';


@Component({
    selector: 'score-component',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.css']
})
export class ScoreComponent{
    public score : any;
    public level : any;
    public lives : any;
    public captured : String;
    public src;

    public scoreSub: any;
    public levelSub: any;
    public livesSub: any;

    constructor(private _GameService : GameService, private _ScoreService: ScoreService){
        this.src = "./favicon.ico";
        this.score = this._GameService.score;
        this.level = this._GameService.level;
        this.lives = this._GameService.lives;
        //this.captured = "The Wild "+this._GameService.gamePokemon.toUpperCase()+" has been captured!";
        this.initSubscriptions();
    }

    initSubscriptions(){
        this.scoreSub = this._ScoreService.gameScore$.subscribe(data => {
           // console.log(this.score);
            this.score = data;
       });

        this.levelSub = this._ScoreService.gameLevel$.subscribe(data => {
            //console.log(this.score);
            this.level = data;
        });

        this.livesSub = this._ScoreService.gameLives$.subscribe(data => {
            //console.log(this.score);
            this.lives = data;
        });
    }
    
    resetCaptured(){

        setTimeout( () => {
            this.captured = "";
        }, 1000);

        //this.captured = "";
    }
}