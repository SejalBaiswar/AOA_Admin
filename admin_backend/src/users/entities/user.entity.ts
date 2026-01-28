import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Address } from "./address.entity";

export enum UserStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

@Entity("users")
export class User {
  // ✅ Let TypeORM generate UUID
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  firstName: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  middleName: string | null;

  @Column({ type: "varchar", length: 255 })
  lastName: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 20 })
  phoneNumber: string;

  @Column({ type: "varchar", length: 20 })
  gender: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  specialization: string | null;

  @Column({ type: "varchar", length: 255 })
  practitionerType: string;

  @Column({
    type: "varchar",
    length: 20,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];
}
