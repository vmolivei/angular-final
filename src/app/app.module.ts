import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

/// COMPONENTS
import { AppComponent } from './app.component';
import {WordsComponent} from '@components/words/words.component';
import {ScoreComponent} from '@components/score/score.component';


//SERVICES
import {GameService} from "@services/game/game.service";
import {WordsService} from '@services/words/words.service';
import {PokemonService} from '@services/pokemon/pokemon.service';
import {ScoreService} from '@services/score/score.service';

// ROUTES
import { routing, appRoutingProviders } from '@routes/main.route';




@NgModule({
  declarations: [
    AppComponent,
    WordsComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [appRoutingProviders, GameService, WordsService, PokemonService, ScoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
