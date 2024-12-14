import { Module } from '@nestjs/common'
import { StaffsService } from './staffs.service'
import { StaffsController } from './staffs.controller'
import { Staff } from './entities/staff.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DepartmensModule } from 'src/departmens/departmens.module'
import { PositionsModule } from 'src/positions/positions.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Staff]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_TIME') },
      }),
      inject: [ConfigService]
    }),
    DepartmensModule,
    PositionsModule,
  ],
  controllers: [StaffsController],
  providers: [StaffsService],
  exports: [StaffsService]
})
export class StaffsModule {}
