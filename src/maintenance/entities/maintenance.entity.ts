import { Project } from 'src/project/entities/project.entity'
import { Staff } from 'src/staffs/entities/staff.entity'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Maintenance {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'date' }) time: string;
  @Column({ default: false })
  status: boolean
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @DeleteDateColumn()
  deletedAt?: Date
  @ManyToOne(() => Project, project => project.maintenances)
  project: Project
  @ManyToOne(() => Staff, staff => staff.maintenances)
  staff: Staff
}
