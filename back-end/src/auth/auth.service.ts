import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../features/users/users.service';
import { validateHash } from '../util/password-hashing';

@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string) {

        const user = this.userService.findOneByEmail(email);
        this.logger.log(`user details found`);

        if (user && ((await validateHash(password, user.password)))) {
            this.logger.log(`user details found`);
            const { email } = user;
            return { email };
        }

        this.logger.debug(`user details are incorrect.`);
        return null;
    }

    generateJWT(user): { access_token: string } {

        if (!user && !user.email) {
            this.logger.debug(`Missing user data which was retured local stategy validator`)
            throw new NotFoundException("User details not initialized")
        }

        this.logger.debug(`received validated data.`);
        const payload = { email: user.email };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}
