import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    private readonly logger = new Logger(LocalStrategy.name);

    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    validate(email: string, password: string) {
        this.logger.log(`credintial details recieved`);
        const user = this.authService.validateUser(email, password);
        if (!user) {
            this.logger.log(`entered user credintial details incorect`);
            throw new UnauthorizedException();
        }
        return user;
    }

}