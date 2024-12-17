import { Project } from 'src/project/entities/project.entity'
import { Staff } from 'src/staffs/entities/staff.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  message: string

  @Column({ default: false })
  isRead: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => Staff, staff => staff.notifications, { nullable: false })
  staff: Staff

  @ManyToOne(() => Project, project => project.notifications, {
    nullable: false,
  })
  project: Project
}
