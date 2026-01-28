import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  house_no: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  street: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  city: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  state: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  country: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  address_type: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  zipCode: string | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  entity_type: string | null; // 'practice' or 'partner'

  @Column({ type: "uuid" })
  user_id: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

