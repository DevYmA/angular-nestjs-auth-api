import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  private usersList: User[] = [
    {
      email: "yoshan@gmail.com",
      firstName: "yoshan",
      lastName: "amarathunga",
      password: "1234556JU"
    }
  ];

  create(createUserDto: CreateUserDto): User {
    const { email } = createUserDto;

    const existRecord = this.usersList.find((user: User) => user.email === email);
    console.log(existRecord);
    if (existRecord) {
      throw new ForbiddenException("Entered email address already added.")
    }
    const newUser: User = new User({ ...createUserDto });
    this.usersList.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.usersList;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findOneByEmail(email: string) {
    const user = this.usersList.find(user => user.email === email);
    if (!user) {
      throw new NotFoundException("User not found.")
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
