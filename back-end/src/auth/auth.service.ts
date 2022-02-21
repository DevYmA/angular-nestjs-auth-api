import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly userService:UsersService,
        private readonly jwtService:JwtService
    ){}

    validateUser(email:string, password:string){
        const user = this.userService.findOneByEmail(email);
        this.logger.log(`user details found`);
        if(user && user.password === password){
            this.logger.log(`user details found`);
            const {email} = user;
            return {email};
        }
        this.logger.log(`user details are incorrect.`);
        return null
    }

    login(user){
        console.log(`${user.email}`)
        const payload = {email:user.email}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}
