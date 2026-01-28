import { PartialType } from "@nestjs/mapped-types";
import { CreatePracticeDto } from "./create-practice.dto";
import { IsOptional, IsEnum } from "class-validator";
import { UserStatus } from "./create-practice.dto";

export class UpdateUserDto extends PartialType(CreatePracticeDto) {
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}
