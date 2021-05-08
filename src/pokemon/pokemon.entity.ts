import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Type from '../type/type.entity'

@ObjectType()
@Entity('Pokemons')
export default class Pokemon {

  @Field(()=> ID)
  @PrimaryGeneratedColumn('increment')
  id: number

  @Field(()=> String)
  @Column()
  name:string

  @Field(()=> Int)
  @Column()
  generation:number

  @Field(()=> Boolean)
  @Column()
  active:boolean

  @Field(()=> Int)
  @Column()
  type_id: number

  @Field(()=> Type)
  @JoinColumn({name: "type_id"})
  @ManyToOne(()=> Type, type => type.pokemons)
  type: Type

  @Field(()=> Date)
  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date

  @Field(()=> Date)
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date
}