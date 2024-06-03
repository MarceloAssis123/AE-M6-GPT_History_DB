import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('new')
  async createUser(@Body() body: { name: string; email: string; age: number }): Promise<User> {
    return this.userService.createUser(body)
  }

  @Get('all')
  async findAllUser(): Promise<User[]> {
    return this.userService.findAllUser()
  }

  @Get('find')
  async getUserByEmail(@Body() body: {email: string}): Promise<User | string> {
    return this.userService.findUserByEmail(body.email);
  }

  @Post('delete')
  async removeUserByEmail(@Body() body: {email: string}): Promise<{ deleted: boolean } | string> {
    return this.userService.deleteUserByEmail(body.email);
  }

  @Post('update')
  async updateUserByEmail(@Body() body: {email: string, name?: string, age?: number}) {
    const updateData = {};
    if (body.name) updateData['name'] = body.name;
    if (body.age) updateData['age'] = body.age;
    return this.userService.updateUserByEmail(body.email, updateData);
  }
}
