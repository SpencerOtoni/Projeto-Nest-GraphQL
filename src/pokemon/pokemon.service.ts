import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Pokemon from './pokemon.entity'
import { CreatePokemon } from './DTO/create-pokemon'
import { UpdatePokemon } from './DTO/update-pokemon'

@Injectable()
export class PokemonService {constructor(
  @InjectRepository(Pokemon)
  private PokemonRepository: Repository<Pokemon>
){}

async createPokemon(data: CreatePokemon): Promise<Pokemon> {
  const pokemon = this.PokemonRepository.create(data)

  const pokemonCreate = await this.PokemonRepository.save(pokemon)

  return pokemonCreate
}

async updatePolemon(data: UpdatePokemon): Promise<Pokemon> {
  const { id } = data
  const pokemon = await this.findPokemon(id)

  if(!pokemon){
    throw new NotFoundException('Type não encontrado.')
  }

  try {
    await this.PokemonRepository.update(pokemon.id, {...data})

    const pokemonUpdate = this.PokemonRepository.create({...pokemon, ...data})
  
    return pokemonUpdate
  } catch (error) {
    throw new NotFoundException(`Erro: ${error.message} ao atualizar o Pokemon!`)
  }
 
}

async findPokemons(actives): Promise<Pokemon[]> {
  const active = actives ? false : true
  const pokemons = this.PokemonRepository.find({
    where: {active},
    relations: ['type']
  })

  return pokemons
}

async findPokemon(id: number): Promise<Pokemon> {
  const pokemon = await this.PokemonRepository.findOne({
    where: {id},
    relations: ['type']
  })

  if(!pokemon ||  pokemon.active === false){
    throw new NotFoundException('Pokemon não encontrado.')
  }

  return pokemon
}

async deletePokemon(id: number) : Promise<Pokemon> {
  const pokemon = await this.findPokemon(id)

  if(!pokemon){
    throw new NotFoundException('Pokemon não encontrado.')
  }

  pokemon.active = false

  try {
    await this.PokemonRepository.update(pokemon.id, {active: false})
  
    return pokemon
    
  } catch (error) {
    throw new NotFoundException(`Erro: ${error.message} ao atualizar o Pokemon!`)
  }

}

}
