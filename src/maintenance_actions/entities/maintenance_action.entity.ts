import { Maintenance } from 'src/maintenance/entities/maintenance.entity'
import { Staff } from 'src/staffs/entities/staff.entity'
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Entity,
  OneToMany,
} from 'typeorm'
@Entity()
export class MaintenanceAction {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'date' }) time: string
  @Column({ default: false })
  status: boolean
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @DeleteDateColumn()
  deletedAt?: Date
  @ManyToOne(() => Staff, staff => staff.maintenanceActions)
  staff: Staff
  @ManyToOne(() => Maintenance, maintenance => maintenance.maintenanceActions)
  maintenance: Maintenance
}
