import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {

  let controller: AuthController;
  let authServiceMock: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            generateJWT: jest.fn().mockImplementation((email) => { access_token: 'fake-token' })
          }
        }
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authServiceMock = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.login).toBeDefined();
  });

  it('should be returned access token', async () => {
    const spyResult = { access_token: 'token' };
    jest.spyOn(authServiceMock, 'generateJWT').mockImplementation(() => spyResult);
    const result = await controller.login({ email: 'name' });
    expect(authServiceMock.generateJWT).toBeCalled();
    expect(result).toBe(spyResult);
  });

  it('should be thrown not found exception', async () => {
    const spyResult = { access_token: 'token' };
    jest.spyOn(authServiceMock, 'generateJWT').mockImplementation(() => spyResult);

    try {
      const result = await controller.login(null);
    } catch (ex) {
      expect(ex).toBeInstanceOf(TypeError);
    }
  });


});
