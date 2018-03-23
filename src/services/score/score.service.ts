import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ScoreService{
    public gameScore = new Subject<any>();
    public gameLives = new Subject<any>();
    public gameLevel = new Subject<any>();
    
    public gameScore$ : any;
    public gameLives$ : any;
    public gameLevel$ : any;

    constructor(){
        this.gameScore$ = this.gameScore.asObservable(); //Has a $
        this.gameLives$ = this.gameLives.asObservable(); //Has a $
        this.gameLevel$ = this.gameLevel.asObservable(); //Has a $
    };

    updateScoreSubject(value) {
        this.gameScore.next(value);
        //console.log(value);
        //this.stringVar$.
    }
    
    updateLevelSubject(value) {
        this.gameLevel.next(value);
        //console.log(value);
        //this.stringVar$.
    }
    
    updateLivesSubject(value) {
        this.gameLives.next(value);
        //console.log(value);
        //this.stringVar$.
    }
}
