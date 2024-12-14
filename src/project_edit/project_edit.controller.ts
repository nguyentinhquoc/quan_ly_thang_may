import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  SetMetadata,
} from '@nestjs/common'
import { ProjectEditService } from './project_edit.service'
import { CreateProjectEditDto } from './dto/create-project_edit.dto'
import { UpdateProjectEditDto } from './dto/update-project_edit.dto'
import { StaffsService } from 'src/staffs/staffs.service'
import { ProjectService } from 'src/project/project.service'
import { Request, Response } from 'express'
import { Res } from '@nestjs/common'
@Controller('project-edit')
export class ProjectEditController {
  constructor (
    private readonly projectEditService: ProjectEditService,
    private readonly staffsService: StaffsService,
    private readonly projectService: ProjectService,
  ) {}

  @Post('/:idProject')

  async create (
    @Param('idProject') idProject: number,
    @Body() createProjectEditDto: CreateProjectEditDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const infor_product = {
      dongCo: createProjectEditDto.dongCo,
      congSuat: createProjectEditDto.congSuat,
      tuDien: createProjectEditDto.tuDien,
      capTai: createProjectEditDto.capTai,
      hoThang: createProjectEditDto.hoThang,
      cabin: createProjectEditDto.cabin,
      cua: createProjectEditDto.cua,
      pit: createProjectEditDto.pit,
      oh: createProjectEditDto.oh,
      baoHanh: createProjectEditDto.baoHanh,
      baoTri: createProjectEditDto.baoTri,
    }
    const token = req.cookies['token']
    if (token) {
      const payload = await this.staffsService.payload(token)
      const idStaff = payload.id
      const staff = await this.staffsService.findOne(idStaff)
      const project = await this.projectService.findOne(idProject)
      const newProject = {
        ...createProjectEditDto,
        staff: staff,
        project: project,
        infor_product: JSON.stringify(infor_product),
      }
      await this.projectEditService.create(newProject)
      res.redirect('back')
    } else {
      res.redirect('/login')
    }
  }

  @Get()
  @SetMetadata('role_admin', true)
  findAll () {
    return this.projectEditService.findAll()
  }

  @Get(':id')
  @SetMetadata('role_admin', true)
  findOne (@Param('id') id: string) {
    return this.projectEditService.findOne(+id)
  }

  @Patch(':id')
  @SetMetadata('role_admin', true)
  update (
    @Param('id') id: string,
    @Body() updateProjectEditDto: UpdateProjectEditDto,
  ) {
    return this.projectEditService.update(+id, updateProjectEditDto)
  }

  @Delete(':id')
  @SetMetadata('role_admin', true)
  remove (@Param('id') id: string) {
    return this.projectEditService.remove(+id)
  }
}
