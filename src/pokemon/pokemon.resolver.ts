import { Resolver, Args, Mutation, Query, Int } from '@nestjs/graphql';
import Pokemon from './pokemon.entity'
import { PokemonService } from './pokemon.service'
import { UpdatePokemon } from './DTO/update-pokemon'
import { CreatePokemon } from './DTO/create-pokemon'

@Resolver()
export class PokemonResolver {
  constructor(
    private pokemonService: PokemonService
  ){}

  @Query(()=> [Pokemon])
  async findPokemons(
    @Args('actives') actives: boolean
  ): Promise<Pokemon[]> {
    const Pokemons = this.pokemonService.findPokemons(actives)

    return Pokemons
  }

  @Query(()=> Pokemon)
  async findPokemon(
    @Args('id') id: number
  ): Promise<Pokemon> {
    console.log(id)
    const type = this.pokemonService.findPokemon(id)

    return type
  }

  @Mutation(() => Pokemon)
  async createPokemon(
    @Args('data') data: CreatePokemon
  ): Promise<Pokemon> {
    const type = this.pokemonService.createPokemon(data)  
    
    return type
  }

  @Mutation(() => Pokemon)
  async updatePokemon(
    @Args('data')
     data: UpdatePokemon
  ): Promise<Pokemon> {
    const type = this.pokemonService.updatePolemon(data)

    return type
  }

  @Mutation(() => Pokemon)
  async deletePokemon(
    @Args('id') 
    id: number
  ): Promise<Pokemon> {
    const deleted = this.pokemonService.deletePokemon(id)

    return deleted
  }
}
