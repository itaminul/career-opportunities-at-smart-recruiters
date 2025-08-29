import { Injectable } from '@nestjs/common';
import { JwtService as Jwt } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';


@Injectable()
export class JwtService {
  constructor(private readonly jwtService: Jwt, private readonly userService: AuthService) {}

  async generateJwtToken(username: string): Promise<string> {
    const payload: JwtPayload = {
      username,
      id: 0,
      sub: 0
    };
    return this.jwtService.sign(payload);
  }
}
