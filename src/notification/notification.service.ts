import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotificationService {
  constructor (
      @InjectRepository(Notification)
      private readonly notificationRepository: Repository<Notification>,
    ) {}
  create(createNotificationDto: CreateNotificationDto) {
    return this.notificationRepository.save(createNotificationDto);
  }

  async findNotificationMax6(id: number): Promise<Notification[]> {
    return this.notificationRepository.createQueryBuilder('notification')
      .innerJoinAndSelect('notification.staff', 'staff')
      .innerJoinAndSelect('notification.project', 'project')
      .where('staff.id = :id', { id })
      .orderBy('notification.createdAt', 'DESC')
      .limit(6)
      .getMany();
  }

  async countUnreadNotifications(staffId: number): Promise<number> {
    return this.notificationRepository.createQueryBuilder('notification')
      .innerJoin('notification.staff', 'staff')
      .where('staff.id = :staffId', { staffId })
      .andWhere('notification.isRead = false')
      .getCount();
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  updateIsRead(id: number) {
    return this.notificationRepository.update(id, { isRead: true });
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
