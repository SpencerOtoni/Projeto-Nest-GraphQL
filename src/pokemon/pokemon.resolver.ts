import { Resolver, Args, Mutation, Query, Int } from '@nestjs/graphql';
import Pokemon from './pokemon.entity'
import { PokemonService } from './pokemon.service'
import { UpdatePokemon } from './DTO/update-pokemon'
import { CreatePokemon } from './DTO/create-pokemon'
import { ActivePokemon } from './DTO/active-pokemon'

@Resolver()
export class PokemonResolver {
  constructor(
    private pokemonService: PokemonService
  ){}

  @Query(()=> [Pokemon])
  async findPokemons(
    @Args('filter', {nullable: true, defaultValue: true}) filter: boolean
  ): Promise<Pokemon[]> {
    const Pokemons = this.pokemonService.findPokemons()

    return Pokemons
  }

  @Query(()=> Pokemon)
  async findPokemon(
    @Args('id', {type: () => Int}) id: number
  ): Promise<Pokemon> {
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
    @Args('id', {type: () => Int}) 
    id: number
  ): Promise<Pokemon> {
    const deleted = this.pokemonService.deletePokemon(id)

    return deleted
  }
}
