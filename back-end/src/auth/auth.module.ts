import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ACCESS_TOKEN_SECRET } from '../environments'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: '60s'
      }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
