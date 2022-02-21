import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  let userServiceMock: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockImplementation((email) => {
              email: 'test@mail.com';
              password: 'password';
              firstName: 'test first';
              lastName: 'test last'
            }),
            findAll: jest.fn().mockImplementation(() => {
              email: 'test@mail.com';
              password: 'password';
              firstName: 'test first';
              lastName: 'test last'
            }),
            findOneByEmail: jest.fn().mockImplementation(() => {
              email: 'test@mail.com';
              password: 'password';
              firstName: 'test first';
              lastName: 'test last'
            }),
          }
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userServiceMock = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.create).toBeDefined();
    expect(controller.findAll).toBeDefined();
  });


  it('should be created user', async () => {
    const spyResult: User = {
      email: 'test@mail.com',
      password: '$2b$10$K7Z5DVf5pVAnw6hIDJmjauCyd.6clS4SHrLGHMIkpwf43KP/QpR5a',
      firstName: 'test first',
      lastName: 'test last'
    };
    jest.spyOn(userServiceMock, 'create').mockImplementation((email) => Promise.resolve(spyResult));
    const result = await controller.create({
      email: 'test@mail.com',
      password: 'password',
      firstName: 'test first',
      lastName: 'test last'
    });

    expect(userServiceMock.create).toBeCalled();
    expect(result).toEqual(spyResult);
  });

  it('should be created user', async () => {
    const spyResult: User = {
      email: 'test@mail.com',
      password: '$2b$10$K7Z5DVf5pVAnw6hIDJmjauCyd.6clS4SHrLGHMIkpwf43KP/QpR5a',
      firstName: 'test first',
      lastName: 'test last'
    };
    jest.spyOn(userServiceMock, 'create').mockImplementation((email) => Promise.resolve(spyResult));
    const result = await controller.create({
      email: 'test@mail.com',
      password: 'password',
      firstName: 'test first',
      lastName: 'test last'
    });

    expect(userServiceMock.create).toBeCalled();
    expect(result).toEqual(spyResult);
  });


  it('should be return all exist users', async () => {
    const spyResult: any = [{
      email: 'test@mail.com',
      password: '$2b$10$K7Z5DVf5pVAnw6hIDJmjauCyd.6clS4SHrLGHMIkpwf43KP/QpR5a',
      firstName: 'test first',
      lastName: 'test last'
    }];
    jest.spyOn(userServiceMock, 'findAll').mockImplementation(() => spyResult);
    const result = await controller.findAll();

    expect(userServiceMock.findAll).toBeCalled();
    expect(result).toEqual(spyResult);
  });


  

});
