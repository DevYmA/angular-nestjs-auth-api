import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PrincipalGuard } from '../../common';

@Controller('users')
export class UsersController {
  
  constructor(
    private readonly usersService: UsersService
  ) { }

  @PrincipalGuard()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @PrincipalGuard()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

}
