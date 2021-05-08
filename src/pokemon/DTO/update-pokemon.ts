import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdatePokemon {
  @Field()
  id: number;

  @Field({nullable: true})
  name: string;

  @Field({nullable: true})
  generation: number;

  @Field({nullable: true})
  type_id: number;
}