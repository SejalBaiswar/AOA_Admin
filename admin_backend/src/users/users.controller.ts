import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ParseUUIDPipe 
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreatePracticeDto } from "./dto/create-practice.dto";
import { CreatePartnerDto } from "./dto/create-partner.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Practice endpoints
  @Post("members")
  createPractice(@Body() createPracticeDto: CreatePracticeDto) {
    return this.usersService.createPractice(createPracticeDto);
  }

  @Get("members")
  async findAllPractices() {
    const users = await this.usersService.findAllPractices();
    return users.map((user) => this.transformUserResponse(user));
  }

  @Get("members/:id")
  async findOnePractice(@Param("id", new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.findOne(id);
    return this.transformUserResponse(user);
  }

  @Patch("members/:id")
  updatePractice(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete("members/:id")
  removePractice(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }

  // Partner endpoints
  @Post("partners")
  createPartner(@Body() createPartnerDto: CreatePartnerDto) {
    return this.usersService.createPartner(createPartnerDto);
  }

  @Get("partners")
  async findAllPartners() {
    const users = await this.usersService.findAllPartners();
    return users.map((user) => this.transformPartnerResponse(user));
  }

  @Get("partners/:id")
  async findOnePartner(@Param("id", new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.findOne(id);
    return this.transformPartnerResponse(user);
  }

  @Patch("partners/:id")
  updatePartner(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete("partners/:id")
  removePartner(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }

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
    // Combine firstName and lastName into name for partners
    const name = [user.firstName, user.middleName, user.lastName]
      .filter(Boolean)
      .join(" ");

    return {
      id: user.id,
      name: name,
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
