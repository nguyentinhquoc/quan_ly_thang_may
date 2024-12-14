import { Department } from 'src/departmens/entities/departmen.entity'
import { Position } from 'src/positions/entities/position.entity'
import { ProjectEdit } from 'src/project_edit/entities/project_edit.entity'
import { ProjectStep } from 'src/project_steps/entities/project_step.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm'

@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 255 })
  full_name: string

  @Column({ unique: true, length: 15 })
  number_phone: string

  @Column({ unique: true, length: 255 })
  email: string

  @Column('text', { nullable: true })
  address: string

  @Column({ length: 255, nullable: true })
  avatar: string

  @Column('text', { nullable: true })
  description: string

  @Column({ default: true })
  status: boolean

  @Column({ length: 255 })
  password: string

  @Column({ default: false })
  role_admin: boolean

  @ManyToOne(() => Department, department => department.staff)
  department: Department

  @ManyToOne(() => Position, position => position.staff)
  position: Position

  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @DeleteDateColumn()
  deletedAt?: Date
  @OneToMany(() => ProjectStep, projectStep => projectStep.staff)
  projectSteps: ProjectStep[]
  @OneToMany(() => ProjectEdit, projectEdit => projectEdit.staff)
  projectEdits: ProjectEdit[]
}
