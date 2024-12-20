import { Staff } from 'src/staffs/entities/staff.entity'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
@Entity()
export class Position {
  @PrimaryGeneratedColumn() id: number
  @Column({ length: 255 ,unique:true })
  name: string
  @Column('text', { nullable: true })
  description: string
  @OneToMany(() => Staff, staff => staff.position)
  staff: Staff[]
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @DeleteDateColumn()
  deletedAt?: Date
}
