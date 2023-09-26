import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, forkJoin, throwError } from 'rxjs';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  public isLoading: boolean = false;
  public haveError: boolean = false;
  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlPokemonName: string = 'https://pokeapi.co/api/v2/pokemon-species';
  public pokemon: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService
  ) {}

  ngOnInit(): void {
    this.getPokemon;
  }

  get getPokemon() {
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemonId = this.pokeApiService.apiGetPokemons(
      `${this.urlPokemon}/${id}`
    );
    const name = this.pokeApiService.apiGetPokemons(
      `${this.urlPokemonName}/${id}`
    );

    return forkJoin([pokemonId, name]).subscribe((res) => {
      if (res) {
        this.pokemon = res;
        this.isLoading = true;
      } else {
        this.haveError = true;
      }
    });
  }
}
