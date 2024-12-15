import { Injectable, NestMiddleware } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request, Response, NextFunction } from 'express'
import { StaffsService } from './staffs/staffs.service'
import { NotificationService } from './notification/notification.service'

@Injectable()
export class GlobalVariablesMiddleware implements NestMiddleware {
  constructor (
    private readonly staffsService: StaffsService,
    private readonly notificationService: NotificationService,
  ) {}

  async use (req: Request, res: Response, next: NextFunction) {
    if (req.path === '/login') {
      return next()
    }
    const token = req.cookies['token']
    if (token) {
      try {
        const payload = await this.staffsService.payload(token)
        res.locals.fullNameLocal = payload.full_name
        res.locals.avatarLocal = payload.avatar
        res.locals.emailLocal = payload.email
        res.locals.role_admin = payload.role_admin
         res.locals.notifications = await this.notificationService.findNotificationMax6(payload.id)
        res.locals.countUnreadNotifications = await this.notificationService.countUnreadNotifications(payload.id)
        next()
      } catch (error) {
        res.redirect('/login')
      }
    } else {
      res.redirect('/login')
    }
  }
}
