import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User, UserStatus } from "./entities/user.entity";
import { Address } from "./entities/address.entity";
import { CreatePracticeDto } from "./dto/create-practice.dto";
import { CreatePartnerDto } from "./dto/create-partner.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async createPractice(createPracticeDto: CreatePracticeDto): Promise<User> {
    const password = `${createPracticeDto.firstName}@2026`;

    const user = this.usersRepository.create({
      firstName: createPracticeDto.firstName,
      middleName: createPracticeDto.middleName || null,
      lastName: createPracticeDto.lastName,
      email: createPracticeDto.email,
      phoneNumber: createPracticeDto.phoneNumber,
      specialization: createPracticeDto.specialization || null,
      practitionerType: createPracticeDto.practitionerType || "",
      status: createPracticeDto.status || UserStatus.ACTIVE,
      gender: "", // Not provided in practice form
      password: password,
    });

    const savedUser = await this.usersRepository.save(user);

    // Save addresses if provided
    if (createPracticeDto.addresses && createPracticeDto.addresses.length > 0) {
      const addresses = createPracticeDto.addresses.map((addr) =>
        this.addressRepository.create({
          house_no: addr.house_no || null,
          street: addr.street || null,
          city: addr.city || null,
          state: addr.state || null,
          country: addr.country || null,
          address_type: addr.addressType || null,
          zipCode: addr.zipCode || addr.zip || null,
          entity_type: "practice",
          user_id: savedUser.id,
        }),
      );
      await this.addressRepository.save(addresses);
    }

    return savedUser;
  }

  async createPartner(createPartnerDto: CreatePartnerDto): Promise<User> {
    // Split partner name into firstName and lastName
    const nameParts = createPartnerDto.name.trim().split(/\s+/);
    const firstName = nameParts[0] || null;
    const lastName = nameParts.slice(1).join(" ") || null;
    const password = `${firstName}@2026`;

    const user = this.usersRepository.create({
      firstName: firstName,
      middleName: null,
      lastName: lastName,
      email: createPartnerDto.email,
      phoneNumber: createPartnerDto.phoneNumber,
      specialization: null, // Not provided in partner form
      practitionerType: createPartnerDto.practitionerType || "",
      status: createPartnerDto.status || UserStatus.ACTIVE,
      gender: "", // Not provided in partner form
      password: password,
    });

    const savedUser = await this.usersRepository.save(user);

    // Save address if provided
    if (
      createPartnerDto.country ||
      createPartnerDto.state ||
      createPartnerDto.city
    ) {
      const address = this.addressRepository.create({
        house_no: createPartnerDto.house_no || null,
        street: createPartnerDto.street || null,
        city: createPartnerDto.city || null,
        state: createPartnerDto.state || null,
        country: createPartnerDto.country || null,
        address_type: null,
        zipCode: null,
        entity_type: "partner",
        user_id: savedUser.id,
      });
      await this.addressRepository.save(address);
    }

    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: ["addresses"],
      order: { createdAt: "DESC" },
    });
  }

  async findAllPractices(): Promise<User[]> {
    const users = await this.usersRepository.find({
      relations: ["addresses"],
      order: { createdAt: "DESC" },
    });
    // Filter users that have at least one address with entity_type = "practice"
    return users.filter((user) =>
      user.addresses?.some((addr) => addr.entity_type === "practice"),
    );
  }

  async findAllPartners(): Promise<User[]> {
    const users = await this.usersRepository.find({
      relations: ["addresses"],
      order: { createdAt: "DESC" },
    });
    // Filter users that have at least one address with entity_type = "partner"
    return users.filter((user) =>
      user.addresses?.some((addr) => addr.entity_type === "partner"),
    );
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ["addresses"],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async createAdmin(email: string, password: string): Promise<User> {
    const admin = this.usersRepository.create({
      firstName: "Admin",
      middleName: null,
      lastName: "User",
      email,
      phoneNumber: "0000000000",
      gender: "Other",
      specialization: null,
      password, // plain text (as per your current setup)
      practitionerType: "admin",
      status: UserStatus.ACTIVE,
    });

    return this.usersRepository.save(admin);
  }

}
