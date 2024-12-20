import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata } from '@nestjs/common';
import { ProjectStepsService } from './project_steps.service';
import { CreateProjectStepDto } from './dto/create-project_step.dto';
import { UpdateProjectStepDto } from './dto/update-project_step.dto';

@Controller('project-steps')
export class ProjectStepsController {
  constructor(private readonly projectStepsService: ProjectStepsService) {}

  @Post()
  @SetMetadata('role_admin', true)
  create(@Body() createProjectStepDto: CreateProjectStepDto) {
    return this.projectStepsService.create(createProjectStepDto);
  }

  @Get()
  @SetMetadata('role_admin', true)
  findAll() {
    // return this.projectStepsService.findAll();
  }

  @Get(':id')
  @SetMetadata('role_admin', true)
  findOne(@Param('id') id: string) {
    return this.projectStepsService.findOne(+id);
  }

  @Patch(':id')
  @SetMetadata('role_admin', true)
  update(@Param('id') id: string, @Body() updateProjectStepDto: UpdateProjectStepDto) {
    return this.projectStepsService.update(+id, updateProjectStepDto);
  }

  @Delete(':id')
  @SetMetadata('role_admin', true)
  remove(@Param('id') id: string) {
    // return this.projectStepsService.remove);
  }
}
