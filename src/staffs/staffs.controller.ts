import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  UploadedFile,
  UseInterceptors,
  Res,
  SetMetadata,
} from '@nestjs/common'
import { Response } from 'express'
import { StaffsService } from './staffs.service'
import { CreateStaffDto } from './dto/create-staff.dto'
import { UpdateStaffDto } from './dto/update-staff.dto'
import { PositionsService } from 'src/positions/positions.service'
import { DepartmensService } from 'src/departmens/departmens.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { SendMailService } from 'src/send-mail/send-mail.service'
import { MailerService } from '@nestjs-modules/mailer'
@Controller('staffs')
export class StaffsController {
  constructor (
    private readonly staffsService: StaffsService,
    private readonly positionsService: PositionsService,
    private readonly departmensService: DepartmensService,
    private readonly sendMailService: SendMailService,
    private mailerService: MailerService,
  ) {}
  @Post()
  create (@Body() createStaffDto: CreateStaffDto) {
    return this.staffsService.create(createStaffDto)
  }
  @Get('/add')
  @SetMetadata('role_admin', true)
  @Render('admin/staff/add')
  async renderAdd () {
    const positions = await this.positionsService.findAll()
    const departmens = await this.departmensService.findAll()
    return {
      positions,
      departmens,
      activeMenu: 'staff',
    }
  }
  @Post('/add')
  @SetMetadata('role_admin', true)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/images/avatar',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + extname(file.originalname)
          callback(null, file.fieldname + '-' + uniqueSuffix)
        },
      }),
    }),
  )
  async postAdd (
    @UploadedFile() file: Express.Multer.File,
    @Body() createStaffDto: CreateStaffDto,
    @Res() res: Response,
  ) {
    if (file) {
      createStaffDto.avatar = file.filename
    }
    await this.staffsService.create(createStaffDto)
    const contentSendMail = await this.sendMailService.notificationCreateStaff(
      createStaffDto.full_name,
      createStaffDto.email,
      'Thông báo tạo tài khoản !!!',
      '<p>Chúng tôi muốn thông báo rằng email của bạn vừa được đang ký tài khoản tại <strong>Thang Máy Tesla</strong>.</p>',
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
    return res.redirect('/staffs')
  }
  @Get()
  @SetMetadata('role_admin', true)
  @Render('admin/staff/staff')
  async findAll () {
    const staffs = await this.staffsService.findAll()
    return {
      staffs,
      activeMenu: 'staff',
    }
  }
  @Get(':id')
  @SetMetadata('role_admin', true)
  findOne (@Param('id') id: string) {
    return this.staffsService.findOne(+id)
  }
  @Patch(':id')
  @SetMetadata('role_admin', true)
  update (@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffsService.update(+id, updateStaffDto)
  }
  @Delete()
  @SetMetadata('role_admin', true)
  remove (@Body('id') id: string) {
    return this.staffsService.remove(+id)
  }
}
