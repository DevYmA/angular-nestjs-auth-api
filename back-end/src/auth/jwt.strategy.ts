import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ACCESS_TOKEN_SECRET } from "../environments";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: ACCESS_TOKEN_SECRET
        })
    }

    validate(payload:any){
        return {
            email: payload.email 
        }
    }

}