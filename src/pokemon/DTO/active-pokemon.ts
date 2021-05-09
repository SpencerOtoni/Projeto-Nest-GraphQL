import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ActivePokemon {

  @Field({nullable: true})
  active: boolean;
  
}