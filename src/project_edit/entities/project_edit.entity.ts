import { Project } from 'src/project/entities/project.entity'
import { ProjectStep } from 'src/project_steps/entities/project_step.entity'
import { Staff } from 'src/staffs/entities/staff.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
@Entity()
export class ProjectEdit {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ length: 255 })
  full_name: string
  @Column({ length: 15 })
  number_phone: string
  @Column({ nullable: true, length: 255 })
  email: string
  @Column(`text`, { nullable: true })
  address: string
  @Column('json', { nullable: true })
  infor_product: string
  @Column({ length: 225, nullable: true })
  description: string
  @Column({ default: 0 })
  status: number
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @DeleteDateColumn()
  deletedAt?: Date
  @OneToMany(() => ProjectStep, (projectStep) => projectStep.project)
  projectSteps: ProjectStep[];
  @ManyToOne(() => Staff, staff => staff.projectEdits, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'staffId' })
  staff: Staff
  @ManyToOne(() => Project, project => project.projectEdits, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId' })
  project: Project
}
