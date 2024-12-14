import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DepartmensModule } from './departmens/departmens.module'
import { StaffsModule } from './staffs/staffs.module'
import { Staff } from './staffs/entities/staff.entity'
import { Department } from './departmens/entities/departmen.entity'
import { PositionsModule } from './positions/positions.module'
import { Position } from './positions/entities/position.entity'
import { CustomersModule } from './customers/customers.module'
import { Customer } from './customers/entities/customer.entity'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { MailerModule } from '@nestjs-modules/mailer'
import { join } from 'path'
import { SendMailService } from './send-mail/send-mail.service'
import { WorkflowsModule } from './workflows/workflows.module'
import { Workflow } from './workflows/entities/workflow.entity'
import { StepsModule } from './steps/steps.module'
import { Step } from './steps/entities/step.entity'
import { WorkflowStepsModule } from './workflow_steps/workflow_steps.module'
import { WorkflowStep } from './workflow_steps/entities/workflow_step.entity'
import { ProjectModule } from './project/project.module'
import { Project } from './project/entities/project.entity'
import { ProjectStepsModule } from './project_steps/project_steps.module'
import { ProjectStep } from './project_steps/entities/project_step.entity'
import { GlobalVariablesMiddleware } from './GlobalVariablesMiddleware'
import { AuthGuard2 } from './guards/auth/auth.guard'
import { ClientModule } from './client/client.module'
import { ProjectEdit } from './project_edit/entities/project_edit.entity'
import { ProjectEditModule } from './project_edit/project_edit.module'
import { MaintenanceModule } from './maintenance/maintenance.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASS'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [
          Staff,
          Department,
          Position,
          Customer,
          Workflow,
          Step,
          WorkflowStep,
          Project,
          ProjectStep,
          ProjectEdit,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get<string>('MAIL_HOST'),
            port: configService.get<number>('MAIL_PORT'),
            secure: false,
            auth: {
              user: configService.get<string>('MAIL_USER'),
              pass: configService.get<string>('MAIL_PASS'),
            },
          },
        }
      },
      inject: [ConfigService],
    }),
    DepartmensModule,
    StaffsModule,
    PositionsModule,
    CustomersModule,
    WorkflowsModule,
    StepsModule,
    WorkflowStepsModule,
    ProjectModule,
    ProjectStepsModule,
    ClientModule,
    ProjectEditModule,
    MaintenanceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard2,
    },
    SendMailService,
  ],
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*')
    consumer.apply(cookieParser()).forRoutes('*')
    consumer
      .apply(GlobalVariablesMiddleware)
      .exclude({ path: 'login', method: RequestMethod.ALL })
      .forRoutes('*')
  }
}
