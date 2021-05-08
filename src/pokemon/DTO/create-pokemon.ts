import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePokemon {
  @Field()
  name: string;

  @Field()
  generation: number;

  @Field()
  type_id: number;
}