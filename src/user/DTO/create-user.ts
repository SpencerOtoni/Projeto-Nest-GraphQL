import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  @IsNotEmpty({message : "Campo não pode estar em branco."})
  @IsOptional()
  name: string;

  @Field({ nullable: true })
  @IsNotEmpty({message : "Campo não pode estar em branco."})
  @IsEmail()
  @IsOptional()
  email: string;
}