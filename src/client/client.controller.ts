import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Res,
  Req,
  Query,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common'
import { ClientService } from './client.service'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import * as session from 'express-session'
import { Response, Request } from 'express'
import { StaffsService } from 'src/staffs/staffs.service'
import { ProjectStepsService } from 'src/project_steps/project_steps.service'
import { ProjectService } from 'src/project/project.service'
import { WorkflowStep } from 'src/workflow_steps/entities/workflow_step.entity'
import { WorkflowStepsService } from 'src/workflow_steps/workflow_steps.service'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'

@Controller('client')
export class ClientController {
  constructor (
    private readonly clientService: ClientService,
    private readonly staffsService: StaffsService,
    private readonly projectStepsService: ProjectStepsService,
    private readonly projectService: ProjectService,
    private readonly workflowStepsService: WorkflowStepsService,
  ) {}

  @Post('/task/:id')
  create (@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto)
  }

  @Get()
  @Render('client/index')
  async renderIndex (@Res() res: Response, @Req() req: Request) {
    const token = req.cookies['token']
    if (token) {
      const payload = await this.staffsService.payload(token)
      const idStaff = payload.id
      const projectSteps = await this.projectStepsService.findDataWIdStaff(
        idStaff,
      )
      return { activeMenu: 'NOACTIVE', projectSteps }
    } else {
      res.redirect('/login')
    }
  }

  @Get('/task/:id')
  @Render('client/detail_project')
  async detailProject (
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const token = req.cookies['token']
    if (token) {
      const payload = await this.staffsService.payload(token)
      const idStaff = payload.id
      const project = await this.projectService.findOne(+id)
      const projectSteps = await this.projectStepsService.findProject(+id)
      return { projectSteps, project, activeMenu: 'NOACTIVE', idStaff }
    } else {
      res.redirect('/login')
    }
  }

  @Post('/confirmSuccessJob/:id')
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: './public/images/project',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + extname(file.originalname)
          callback(null, file.fieldname + '-' + uniqueSuffix)
        },
      }),
    }),
  )
  async SuccessJob (
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Body('workflowStepId') workflowStepId: string,
    @Body('feedback') feedback: string,
  ) {
    const token = req.cookies['token']
    if (token) {
      const images = files.map(file => file.filename)
      const image = JSON.stringify(images)
      const payload = await this.staffsService.payload(token)
      const idStaff = payload.id
      const staff = await this.staffsService.findOne(+idStaff)
      const project = await this.projectService.findOne(+id)
      const workflowStep = await this.workflowStepsService.findOne(
        +workflowStepId,
      )
      await this.projectStepsService.updateStatusWProjectAWorkflowSteps(
        image,
        feedback,
        staff,
        project,
        workflowStep,
      )
      const checkStatusProject =
        await this.projectStepsService.findWProjectAStatus(+id)
      if (checkStatusProject.length === 0) {
        await this.projectService.updateStatusProject(project.id, 1)
      }

      res.redirect('back')
    } else {
      res.redirect('back')
    }
  }
  @Patch(':id')
  update (@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto)
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.clientService.remove(+id)
  }
}
