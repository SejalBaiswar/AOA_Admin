import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user || user.password !== password) {
      throw new UnauthorizedException("Invalid credentials");
    }

    if (user.practitionerType !== "admin") {
      throw new UnauthorizedException("Access denied: admin only");
    }

    return {
      accessToken: "dummy-token",
      practitionerType: user.practitionerType,
      userId: user.id,
    };
  }
}
