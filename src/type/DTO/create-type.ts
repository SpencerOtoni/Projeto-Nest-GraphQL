import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateType {
  @Field()
  name: string;
}