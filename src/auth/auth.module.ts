import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Resume } from "src/entity/resume";
import { Resume_attachments } from "src/entity/Resume_attachements";

@Module({
  imports: [TypeOrmModule.forFeature([Resume, Resume_attachments])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
