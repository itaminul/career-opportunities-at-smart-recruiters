import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./jwt-payload.interface";
import { AuthService } from "./auth.service";
import { Resume } from "src/entity/resume";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Resume)
    public readonly resumeRepository: Repository<Resume>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_SECRET", "defaultSecret"),
    });
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;
    const user = await this.resumeRepository.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new Error("Unauthorized");
    }

    return user;
  }
}
