import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Type from './type.entity'
import { CreateType } from './DTO/create-type'
import { UpdateType } from './DTO/update-type'

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private TypeRepository: Repository<Type>
  ){}

  async createType(data: CreateType): Promise<Type> {
    const type = this.TypeRepository.create(data)

    const userCreate = await this.TypeRepository.save(type)

    return userCreate
  }

  async updateType(data: UpdateType): Promise<Type> {
    const { id } = data
    const type = await this.findType(id)

    if(!type){
      throw new NotFoundException('Type não encontrado.')
    }

    const teste = await this.TypeRepository.update(type.id, {...data})

    console.log(teste)

    const userUpdate = this.TypeRepository.create({...type, ...data})

    return userUpdate
  }

  async findTypes(): Promise<Type[]> {
    const types = this.TypeRepository.find({
      relations: ['pokemons']
    })

    return types
  }

  async findType(id: number): Promise<Type> {
    const type = await this.TypeRepository.findOne({
      where: {id},
      relations: ['pokemons']
    })
 
    if(!type){
      throw new NotFoundException('Type não encontrado.')
    }

    return type
  }

  async deleteType(id: number) : Promise<boolean> {
    const type = await this.findType(id)

    if(!type){
      throw new NotFoundException('Type não encontrado.')
    }

    const deleted = this.TypeRepository.delete(id)

    if(deleted){
      return true
    }

    return false

  }
}
