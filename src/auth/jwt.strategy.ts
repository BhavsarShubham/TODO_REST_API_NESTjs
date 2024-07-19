import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt"
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
      private readonly  databaseService: DatabaseService
    )
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "Secret"
        })
    }

    async validate(payload: { email: string }) {
        console.log(payload)
        const user2 = await this.databaseService.user2.findFirst({
          where: {
            email: payload.email,
          }
        });
        return user2;
      }

}