import { Project } from 'src/project/entities/project.entity'
import { Staff } from 'src/staffs/entities/staff.entity'
import { WorkflowStep } from 'src/workflow_steps/entities/workflow_step.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
@Entity('project_steps')
export class ProjectStep {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => WorkflowStep, workflowStep => workflowStep.projectStep, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workflowStepId' })
  workflowStep: WorkflowStep

  @ManyToOne(() => Project, project => project.projectSteps, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId' })
  project: Project
  @ManyToOne(() => Staff, staff => staff.projectSteps, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'staffId' })
  staff: Staff
  @Column()
  time: Date
  @Column({ default: 0 })
  status: number
  @Column({ nullable: true })
  feedback: string
  @Column('json', { nullable: true })
  image: string
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date
}
