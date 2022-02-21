import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { generateHash } from '../../util/password-hashing';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  private readonly logger = new Logger(UsersService.name);

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

    const existRecord = this.findOneByEmail(email);
    
    if (existRecord) {
      this.logger.error(`email already exist`);
      throw new ForbiddenException("Entered email address already added.")
    }

    const newUser: User = new User({...createUserDto });
    
    //creating hash password
    const hash = await generateHash(password);
    this.logger.debug(`password hash was created`);

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
      this.logger.error(`email already exist`);
      throw new NotFoundException("User not found.")
    }
    return user;
  }

}
