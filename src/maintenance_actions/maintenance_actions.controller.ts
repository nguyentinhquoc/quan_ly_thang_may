import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common'
import { MaintenanceActionsService } from './maintenance_actions.service'
import { CreateMaintenanceActionDto } from './dto/create-maintenance_action.dto'
import { UpdateMaintenanceActionDto } from './dto/update-maintenance_action.dto'
import { MaintenanceService } from 'src/maintenance/maintenance.service'
import { StaffsService } from 'src/staffs/staffs.service'
import { Response } from 'express'
import { NotificationService } from 'src/notification/notification.service'
import { Project } from 'src/project/entities/project.entity'
import { ProjectService } from 'src/project/project.service'
import { SendMailService } from 'src/send-mail/send-mail.service'
import { MailerService } from '@nestjs-modules/mailer'

@Controller('maintenance-actions')
export class MaintenanceActionsController {
  constructor (
    private readonly maintenanceActionsService: MaintenanceActionsService,
    readonly maintenanceService: MaintenanceService,
    readonly staffsService: StaffsService,
    readonly notificationService: NotificationService,
    readonly projectService: ProjectService,
    readonly sendMailService: SendMailService,
    readonly mailerService: MailerService,
  ) {}

  @Post(':id')
  async create (
    @Param('id') id: string,
    @Body() createMaintenanceActionDto: CreateMaintenanceActionDto,
    @Res() res: Response,
  ) {
    await this.maintenanceActionsService.create(createMaintenanceActionDto)
    const Project = await this.projectService.findOne(+id)
    const Staff = await this.staffsService.findOne(
      +createMaintenanceActionDto.staff,
    )
    await this.notificationService.create({
      title: 'Thông báo về nhiệm vụ mới của bạn !!!',
      message: `Bảo trì tại công trình :${Project.full_name}`,
      staff: Staff,
      project: Project,
    })
    const contentSendMail = await this.sendMailService.notificationNewJob(
      Staff.full_name,
      Staff.email,
      'Thông báo nhiệm vụ mới !!!',
      `Chúng tôi xin thông báo về nhiệm vụ mới của bạn tại <strong>Thang máy Tesla </strong> <br> <div class="password">Bạn cần bảo trì tại công trình :${Project.full_name}</div> `,
    )
    this.mailerService
      .sendMail(contentSendMail)
      .then(() => {
        console.log('Email sent successfully')
      })
      .catch(error => {
        console.error('Error sending email:', error)
        return { message: 'Gửi mail thất bại!', error: error.message }
      })

    return res.redirect('back')
  }

  @Get()
  findAll () {
    return this.maintenanceActionsService.findAll()
  }

  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.maintenanceActionsService.findOne(+id)
  }

  @Patch(':id')
  update (
    @Param('id') id: string,
    @Body() updateMaintenanceActionDto: UpdateMaintenanceActionDto,
  ) {
    return this.maintenanceActionsService.update(
      +id,
      updateMaintenanceActionDto,
    )
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.maintenanceActionsService.remove(+id)
  }
}
