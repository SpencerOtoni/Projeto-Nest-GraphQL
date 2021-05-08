import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {

    @Field({nullable: true})
    name: string;

    @Field({nullable: true})
    @IsEmail()
    @IsNotEmpty({message: 'Invalid E-mail'})
    @IsOptional()
    email: string;
}