import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import User from './user.entity';
import { CreateUserInput } from './DTO/create-user';
import { UserService } from './user.service';
import { UpdateUserInput } from './DTO/update-user';


@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService
  ){}
  
  @Query(() => [User])
  async findUsers(): Promise<User[]> {
    const users = this.userService.findAllUsers()

    return users
  }

  @Query(() => User)
  async findUser(
    @Args('id') id: string
  ): Promise<User> {
    const user = this.userService.findUserById(id)

    return user
  }

  @Mutation(() => User)
  async createUser( 
    @Args('data') data: CreateUserInput
  ): Promise<User> {
    const user = this.userService.createUser(data)

    return user
  }

  @Mutation(() => User)
  async updateUser( 
    @Args('id') id: string,
    @Args('data') data: UpdateUserInput
  ): Promise<User> {
    const user = this.userService.updateUser(id, data)

    return user
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Args('id') id: string
  ): Promise<boolean> {
    const deleted = this.userService.deleteUser(id)

    return deleted
   }
}
