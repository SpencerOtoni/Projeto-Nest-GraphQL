import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateType {
  @Field()
  id: number;

  @Field({nullable: true})
  name: string;
}