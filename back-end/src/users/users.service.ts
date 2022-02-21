import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { generateHash } from 'src/util/password-hashing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  private usersList: User[] = [
    {
      email: "ricky@mainhost.com",
      firstName: "Ricky",
      lastName: "Martin",
      password: "$2b$10$CKDyuCWgaXc0RzHobGHxSeQrFO.BMBpYx.QQfwuatgDDHhrnUnhlq"
    }
  ];

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const existRecord = this.usersList.find((user: User) => user.email === email);
    console.log(existRecord);
    if (existRecord) {
      throw new ForbiddenException("Entered email address already added.")
    }

    const newUser: User = new User({...createUserDto });
    
    //create hash password
    const hash = await generateHash(password);
    newUser.password = hash;
    
    this.usersList.push(newUser);
    return newUser;
  }

  findAll(): any {
    return this.usersList.map(user => {
      const {password, ...rest} = user;
      return rest;
    });
  }

  findOneByEmail(email: string) {
    const user = this.usersList.find(user => user.email === email);
    if (!user) {
      throw new NotFoundException("User not found.")
    }
    return user;
  }

}
