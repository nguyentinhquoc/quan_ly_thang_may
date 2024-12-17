import { MaintenanceAction } from 'src/maintenance_actions/entities/maintenance_action.entity'
import { Project } from 'src/project/entities/project.entity'
import { Staff } from 'src/staffs/entities/staff.entity'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Maintenance {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'date' }) time: string
  @Column({ default: false })
  timeSuccess: string
  @Column({ default: 'Bảo trì định kỳ' })
  reason: string
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @DeleteDateColumn()
  deletedAt?: Date
  @ManyToOne(() => Project, project => project.maintenances)
  project: Project
  @OneToMany(
    () => MaintenanceAction,
    maintenanceAction => maintenanceAction.maintenance,
  )
  maintenanceActions: MaintenanceAction[]
}
