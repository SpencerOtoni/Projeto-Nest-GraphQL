import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Pokemon from '../pokemon/pokemon.entity'

@ObjectType()
@Entity('Types')
export default class Type {

  @Field(()=> ID)
  @PrimaryGeneratedColumn('increment')
  id: number

  @Field(()=> String)
  @Column()
  name:string

  @Field(()=> Date)
  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date

  @Field(()=> Date)
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date

  @Field(()=> [Pokemon])
  @OneToMany(() => Pokemon, pokemon => pokemon.type)
    pokemons: Pokemon[];
}