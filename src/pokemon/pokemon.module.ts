import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonResolver } from './pokemon.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import Pokemon from './pokemon.entity'
 
@Module({
  imports: [TypeOrmModule.forFeature([Pokemon])],
  providers: [PokemonService, PokemonResolver],
  exports: [PokemonService]
})
export class PokemonModule {}
