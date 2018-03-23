import { Component } from '@angular/core';
import {GameService} from '@services/game/game.service';
import {WordsService} from '@services/words/words.service';
import {ALLPOKEMONS} from '@services/pokemon/pokemon.list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Who is this Pokemon?!';
  public gameWord = [];
  public restartMsg = "";
  public pokeSrc = "";
  public captured = "";
  public gamePoke = "";

  public restart = false;

  constructor(private _GameService : GameService, private _WordsService: WordsService){
    this.gameWord = this._GameService.gameWord;
    this.gamePoke = this._GameService.gamePokemon;
    this.pokeSrc = this.getSpriteDir();
    this.restartMsg = "The wild " + this._GameService.gamePokemon + " fled!";

  
    const restartSub = this._GameService.restart$.subscribe(data => {
      //console.log(this.restart);
      this.restartMsg = "The wild " + this._GameService.gamePokemon.toUpperCase() + " fled!";
      this.restart = data;
    });

    const gameWordSub = this._WordsService.gameWord$.subscribe(data =>{
      if(_GameService.score > 0){
          this.captured = "The Wild "+this.gamePoke.toUpperCase()+" has been captured!";     
      }
      
      this.gameWord = data;
      this.gamePoke = _GameService.gamePokemon;

      this.resetSilhouet();
    });
  }
  getSpriteDir(){
    let pos = ALLPOKEMONS.indexOf(this._GameService.gamePokemon);
    return "./assets/sprites/" + (pos + 1) + ".png";
  }

  restartGame(){
    this._GameService.restartGame();
  }
  
  resetSilhouet(){
    setTimeout( () => {
      this.pokeSrc = this.getSpriteDir(); // trying to sync with Captured Message
      this.captured = "";
    }, 1000);
  };
  

  /*myClick(char){
    console.log(char);
    this._GameService.resetGame();
    this.str = this._GameService.gameWord;
  }*/
}
