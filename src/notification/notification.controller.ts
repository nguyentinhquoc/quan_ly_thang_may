import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { NotificationService } from './notification.service'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { UpdateNotificationDto } from './dto/update-notification.dto'

@Controller('notification')
export class NotificationController {
  constructor (private readonly notificationService: NotificationService) {}

  @Post()
  create (@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto)
  }

  @Get()
  findAll () {
    return this.notificationService.findAll()
  }

  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.notificationService.findOne(+id)
  }

  @Patch(':id/read')
  async updateIsRead (@Param('id') id: number) {
    return await this.notificationService.updateIsRead(id)
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.notificationService.remove(+id)
  }
}
