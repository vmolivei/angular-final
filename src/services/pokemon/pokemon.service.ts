import { Injectable } from '@angular/core';
import {ALLPOKEMONS} from './pokemon.list';
import {pokemonsByRank} from './pokemon.level';

@Injectable()
export class PokemonService{

  constructor() { }

  getAllPokemons(){
    return ALLPOKEMONS;
  }

  getRandPokemon(level, oldPokemon){
    let pokePool = this.getPokemonsByLevel(level);
    let max = pokePool.length;
    let poke = "";
    console.log(level);

    while(true){ // while pokemon not different from old
      let rand = Math.floor((Math.random() * (max - 1)));
      poke = pokePool[rand].toLowerCase();
      
      if(poke != oldPokemon){
        break;
      }
    }

    return poke;
    
  }

  getPokemonsByLevel(level){
    if(level == 1) return pokemonsByRank.rank1;
    if(level == 2) return pokemonsByRank.rank2;
    if(level == 3) return pokemonsByRank.rank3;
    if(level == 4) return pokemonsByRank.rank4;

    return ALLPOKEMONS;
  }

}

