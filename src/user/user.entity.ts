import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity()
export default class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  name?: string;

  @Field(() => String)
  @Column({ nullable: true, unique: true })
  email?: string;
}