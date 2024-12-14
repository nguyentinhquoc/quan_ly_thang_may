import { Module } from '@nestjs/common'
import { StepsService } from './steps.service'
import { StepsController } from './steps.controller'
import { Step } from './entities/step.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Step])],
  controllers: [StepsController],
  providers: [StepsService],
  exports: [StepsService],
})
export class StepsModule {}
