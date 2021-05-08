import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import User from './user.entity';
import { CreateUserInput } from './DTO/create-user';
import { UpdateUserInput } from './DTO/update-user';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepositoru: Repository<User>
  ){}

  async createUser(data: CreateUserInput): Promise<User> {
    const user = this.UserRepositoru.create(data)

    const userCreate = await this.UserRepositoru.save(user)

    if(!userCreate){
      throw new InternalServerErrorException('Usuário não foi criado!')
    }
    return userCreate
  }

  async findAllUsers(): Promise<User[]> {
    const users = this.UserRepositoru.find()

    return users
  }

  async findUserById(id: string): Promise<User> {
    const user = this.UserRepositoru.findOne(id)

    if(!user){
      throw new NotFoundException('Usuário não encontrado.')
    }

    return user
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.findUserById(id)

    await this.UserRepositoru.update(user, {...data})

    const userUpdate =  this.UserRepositoru.create({...user, ...data})

    return userUpdate
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.findUserById(id)

    const deleted = this.UserRepositoru.delete(user)

    if(deleted){
      return true
    }

    return false
  }
}
