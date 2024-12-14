import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 255 })
  full_name: string;
  @Column({ length: 15 })
  number_phone: string;
  @Column({ nullable: true, length: 255 })
  email: string;
  @Column(`text`, { nullable: true })
  address: string;
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @DeleteDateColumn()
  deletedAt?: Date
}
