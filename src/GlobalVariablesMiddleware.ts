import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { StaffsService } from './staffs/staffs.service';

@Injectable()
export class GlobalVariablesMiddleware implements NestMiddleware {
  constructor(
    private readonly staffsService: StaffsService,
  ) { }

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.path === '/login') {
      return next();
    }
    const token = req.cookies['token'];
    if (token) {
      try {
        const payload = await this.staffsService.payload(token);
        res.locals.fullNameLocal = payload.full_name;
        res.locals.avatarLocal = payload.avatar;
        res.locals.emailLocal = payload.email;
        res.locals.role_admin = payload.role_admin;
        next();
      } catch (error) {
        // res.redirect('/login');
        next();

      }
    } else {
      // res.redirect('/login');
      next();

    }
  }
}
