import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Resume } from "src/entity/resume";
import { Resume_attachments } from "src/entity/Resume_attachements";
import { CreateLoginDto } from "./dto/create-login.dto";
import { JwtPayload } from "./jwt-payload.interface";


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
    @InjectRepository(Resume_attachments)
    private readonly resumeAttacheRepository: Repository<Resume_attachments>,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Validates user credentials
   * @param username 
   * @param password 
   * @returns user without password if valid
   * @throws NotAcceptableException if user not found
   * @throws UnauthorizedException if password is invalid
   */
  async validateUser(username: string, password: string): Promise<{
    id: number; username: string 
}> {
    try {
      const user = await this.resumeRepository.findOne({
        where: { username },
        select: ['id', 'username', 'password'] // Explicitly select needed fields
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      const passwordValid = await bcrypt.compare(password, user.password);
      
      if (!passwordValid) {
        throw new UnauthorizedException("Invalid credentials");
      }

      // Omit password from returned user object
      const { password: _, ...result } = user;
      return result;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException("Error validating user");
    }
  }

  /**
   * Logs in a user and returns JWT token
   * @param loginDto 
   * @returns access token and user info
   * @throws UnauthorizedException if login fails
   */
  async login(loginDto: CreateLoginDto): Promise<{ access_token: string; username: string }> {
    try {
      // First validate the user
      const user = await this.validateUser(loginDto.username, loginDto.password);
      
      // Then create JWT payload
      const payload: JwtPayload = {
        username: user.username,
        sub: user.id,
        id: 0
      };

      // Generate access token
      const access_token = this.jwtService.sign(payload);
      
      return {
        access_token,
        username: user.username,
      };
    } catch (error) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: "Login failed: Invalid credentials",
        error: "Unauthorized",
      });
    }
  }

  /**
   * Validates JWT payload
   * @param payload 
   * @returns user if valid
   * @throws UnauthorizedException if invalid
   */
  async validateJwtPayload(payload: JwtPayload): Promise<Resume> {
    try {
      const user = await this.resumeRepository.findOne({
        where: { username: payload.username }
      });

      if (!user) {
        throw new UnauthorizedException("Invalid token");
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}