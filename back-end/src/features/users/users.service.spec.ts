import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.create).toBeDefined();
    expect(service.findAll).toBeDefined();
    expect(service.findOneByEmail).toBeDefined();
  });

  it('should be created users', async () => {

    const spyResult: any = undefined;
    jest.spyOn(service, 'findOneByEmail').mockImplementation((email) => spyResult);

    const result = await service.create({
      email: 'test@mail.com',
      password: 'password',
      firstName: 'test first',
      lastName: 'test last'
    });

    expect(service.findOneByEmail).toBeCalled();
    expect(result);
  });


  it('should be thrown user already exist', async () => {

    const spyResult: User = {
      email: 'test@mail.com',
      password: '$2b$10$K7Z5DVf5pVAnw6hIDJmjauCyd.6clS4SHrLGHMIkpwf43KP/QpR5a',
      firstName: 'test first',
      lastName: 'test last'
    };

    jest.spyOn(service, 'findOneByEmail').mockImplementation((email) => spyResult);

    try {
      const result = await service.create({
        email: 'test@mail.com',
        password: 'password',
        firstName: 'test first',
        lastName: 'test last'
      });

    } catch (ex) {
      expect(ex).toBeInstanceOf(ForbiddenException);
    }
  });

  it('should be returned user by email', async () => {

    const result = await service.findOneByEmail("ricky@mainhost.com");

    expect(result).toEqual({
      "email": "ricky@mainhost.com",
      "firstName": "Ricky",
      "lastName": "Martin",
      "password": "$2b$10$CKDyuCWgaXc0RzHobGHxSeQrFO.BMBpYx.QQfwuatgDDHhrnUnhlq",
    });
  });


  it('should be thrown user not found realated to entered email address', async () => {

    try {
      const result = await service.findOneByEmail("test@mail.com");

    } catch (ex) {
      expect(ex).toBeInstanceOf(NotFoundException);
    }
  });


  it('should be returned user details without password', async () => {

    const result = await service.findAll();

    expect(result).toEqual([{
      "email": "ricky@mainhost.com",
      "firstName": "Ricky",
      "lastName": "Martin"
    }]);
  });
  

});
