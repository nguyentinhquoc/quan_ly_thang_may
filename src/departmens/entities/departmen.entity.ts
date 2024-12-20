import { Staff } from 'src/staffs/entities/staff.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';
@Entity()
export class Department {
  @PrimaryGeneratedColumn() id: number;
  @Column({ length: 255, unique: true }) name: string;
  @OneToMany(() => Staff, staff => staff.department)
  staff: Staff[];
  @Column('text',{nullable:true})
  description: string
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @DeleteDateColumn()
  deletedAt?: Date
}