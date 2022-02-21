import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/features/users/entities/user.entity';
import { UsersService } from '../features/users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  let userServiceMock: UsersService;
  let jwtServiceMock: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn().mockImplementation((email) => {
              email: 'test@mail.com';
              password: 'password';
              firstName: 'test first';
              lastName: 'test last'
            })
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockImplementation((email) => 'fake-token')
          }
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userServiceMock = module.get<UsersService>(UsersService);
    jwtServiceMock = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.generateJWT).toBeDefined();
    expect(service.validateUser).toBeDefined();
  });

  it('should be returned valid user', async () => {
    const spyResult: User = {
      email: 'test@mail.com',
      password: '$2b$10$K7Z5DVf5pVAnw6hIDJmjauCyd.6clS4SHrLGHMIkpwf43KP/QpR5a',
      firstName: 'test first',
      lastName: 'test last'
    };
    jest.spyOn(userServiceMock, 'findOneByEmail').mockImplementation((email) => spyResult);
    const result = await service.validateUser('test@mail.com', 'password');
    
    expect(userServiceMock.findOneByEmail).toBeCalled();
    expect(result).toEqual({ "email": "test@mail.com" });
  });

  it('should be returned null hence pure password', async () => {
    const spyResult: User = {
      email: 'test@mail.com',
      password: 'password',
      firstName: 'test first',
      lastName: 'test last'
    };
    jest.spyOn(userServiceMock, 'findOneByEmail').mockImplementation((email) => spyResult);
    const result = await service.validateUser('test@mail.com', 'password');
    
    expect(userServiceMock.findOneByEmail).toBeCalled();
    expect(result).toBe(null);
  });

  it('should be returned singed jwt token', async () => {
    const spyResult = 'fake-token';
    jest.spyOn(jwtServiceMock, 'sign').mockImplementation((payload) => spyResult);
    const result = await service.generateJWT('test@mail.com');
    
    expect(jwtServiceMock.sign).toBeCalled();
    expect(result).toEqual({ "access_token": "fake-token" });
  });


  it('should be thrown not initilized user data', async () => {
    const spyResult = 'fake-token';
    jest.spyOn(jwtServiceMock, 'sign').mockImplementation((payload) => spyResult);

    try {
      const result = await service.generateJWT({email:undefined});
    } catch (ex) {
      expect(ex).toBeInstanceOf(NotFoundException);
    }
  });

});
