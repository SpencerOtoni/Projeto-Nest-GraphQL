import { Resolver, Args, Mutation, Query, Int } from '@nestjs/graphql';
import Type from './type.entity'
import { TypeService } from './type.service'
import { UpdateType } from './DTO/update-type'
import { CreateType } from './DTO/create-type'
@Resolver()
export class TypeResolver {
  constructor(
    private typeService: TypeService
  ){}

  @Query(()=> [Type])
  async findTypes(): Promise<Type[]> {
    const types = this.typeService.findTypes()

    return types
  }

  @Query(()=> Type)
  async findType(
    @Args('id') 
    id: number
  ): Promise<Type> {
    const type = this.typeService.findType(id)

    return type
  }

  @Mutation(() => Type)
  async createType(
    @Args('data') data: CreateType
  ): Promise<Type> {
    const type = this.typeService.createType(data)  
    
    return type
  }

  @Mutation(() => Type)
  async updateType(
    @Args('data')
     data: UpdateType
  ): Promise<Type> {
    const type = this.typeService.updateType(data)

    return type
  }

  @Mutation(() => Boolean)
  async deleteType(
    @Args('id') 
    id: number
  ): Promise<boolean> {
    const deleted = this.typeService.deleteType(id)

    return deleted
  }

}


