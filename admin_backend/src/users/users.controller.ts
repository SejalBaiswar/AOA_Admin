import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreatePracticeDto } from "./dto/create-practice.dto";
import { CreatePartnerDto } from "./dto/create-partner.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /* =========================
     COMMON RESPONSE BUILDER
  ========================== */
  private buildResponse(status: number, message: string, data: any) {
    return {
      status,
      success: status >= 200 && status < 300,
      message,
      data,
    };
  }

  /* =========================
        PRACTICE ENDPOINTS
  ========================== */

  @Post("members")
  @HttpCode(HttpStatus.CREATED)
  async createPractice(@Body() createPracticeDto: CreatePracticeDto) {
    const user = await this.usersService.createPractice(createPracticeDto);

    return this.buildResponse(
      HttpStatus.CREATED,
      "Practice created successfully",
      this.transformUserResponse(user),
    );
  }

  @Get("members")
  async findAllPractices() {
    const users = await this.usersService.findAllPractices();

    return this.buildResponse(
      HttpStatus.OK,
      "Practices fetched successfully",
      users.map((user) => this.transformUserResponse(user)),
    );
  }

  @Get("members/:id")
  async findOnePractice(@Param("id", ParseUUIDPipe) id: string) {
    const user = await this.usersService.findOne(id);

    return this.buildResponse(
      HttpStatus.OK,
      "Practice fetched successfully",
      this.transformUserResponse(user),
    );
  }

  @Patch("members/:id")
  async updatePractice(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(id, updateUserDto);

    return this.buildResponse(
      HttpStatus.OK,
      "Practice updated successfully",
      this.transformUserResponse(user),
    );
  }

  @Delete("members/:id")
  async removePractice(@Param("id", ParseUUIDPipe) id: string) {
    await this.usersService.remove(id);

    return this.buildResponse(
      HttpStatus.OK,
      "Practice deleted successfully",
      null,
    );
  }

  /* =========================
         PARTNER ENDPOINTS
  ========================== */

  @Post("partners")
  @HttpCode(HttpStatus.CREATED)
  async createPartner(@Body() createPartnerDto: CreatePartnerDto) {
    const user = await this.usersService.createPartner(createPartnerDto);

    return this.buildResponse(
      HttpStatus.CREATED,
      "Partner created successfully",
      this.transformPartnerResponse(user),
    );
  }

  @Get("partners")
  async findAllPartners() {
    const users = await this.usersService.findAllPartners();

    return this.buildResponse(
      HttpStatus.OK,
      "Partners fetched successfully",
      users.map((user) => this.transformPartnerResponse(user)),
    );
  }

  @Get("partners/:id")
  async findOnePartner(@Param("id", ParseUUIDPipe) id: string) {
    const user = await this.usersService.findOne(id);

    return this.buildResponse(
      HttpStatus.OK,
      "Partner fetched successfully",
      this.transformPartnerResponse(user),
    );
  }

  @Patch("partners/:id")
  async updatePartner(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(id, updateUserDto);

    return this.buildResponse(
      HttpStatus.OK,
      "Partner updated successfully",
      this.transformPartnerResponse(user),
    );
  }

  @Delete("partners/:id")
  async removePartner(@Param("id", ParseUUIDPipe) id: string) {
    await this.usersService.remove(id);

    return this.buildResponse(
      HttpStatus.OK,
      "Partner deleted successfully",
      null,
    );
  }

  /* =========================
        RESPONSE TRANSFORMS
  ========================== */

  private transformUserResponse(user: any) {
    return {
      id: user.id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      specialization: user.specialization,
      practitionerType: user.practitionerType,
      status: user.status,
      professionalInfo: {
        specialization: user.specialization,
        practitionerType: user.practitionerType,
      },
      addresses: (user.addresses || []).map((addr: any) => ({
        addressType: addr.address_type,
        country: addr.country,
        state: addr.state,
        city: addr.city,
        zip: addr.zipCode,
        street: addr.street,
        houseNo: addr.house_no,
      })),
    };
  }

  private transformPartnerResponse(user: any) {
    const name = [user.firstName, user.middleName, user.lastName]
      .filter(Boolean)
      .join(" ");

    return {
      id: user.id,
      name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      practitionerType: user.practitionerType,
      status: user.status,
      addresses: (user.addresses || []).map((addr: any) => ({
        addressType: addr.address_type,
        country: addr.country,
        state: addr.state,
        city: addr.city,
        zip: addr.zipCode,
        street: addr.street,
        houseNo: addr.house_no,
      })),
    };
  }
}
