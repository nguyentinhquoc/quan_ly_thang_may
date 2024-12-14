import { WorkflowStep } from 'src/workflow_steps/entities/workflow_step.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm'
@Entity()
export class Workflow {
  @PrimaryGeneratedColumn() id: number
  @Column({ length: 225, unique: true })
  name: string
  @Column('text', { nullable: true })
  description: string
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @DeleteDateColumn()
  deletedAt?: Date
  @OneToMany(() => WorkflowStep, (workflowStep) => workflowStep.workflow)
  workflowSteps: WorkflowStep[];
}
