import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { StaffsService } from 'src/staffs/staffs.service'
import { Response } from 'express'
@Injectable()
export class AuthGuard2 implements CanActivate {
  constructor (
    private staffsService: StaffsService,
    private reflector: Reflector,
  ) {}
  async canActivate (context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    )
    const role_admin = this.reflector.get<boolean>(
      'role_admin',
      context.getHandler(),
    )
    const request = context.switchToHttp().getRequest()
    const response: Response = context.switchToHttp().getResponse()
    const token = request.cookies['token']
    // Nếu endpoint là public, cho phép truy cập
    if (isPublic) {
      return true
    }
    // Kiểm tra quyền truy cập với token
    if (!token) {
      return this.redirectToLogin(
        response,
        'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại',
      )
    }
    try {
      // Kiểm tra payload token
      const payload = await this.staffsService.payload(token)
      // Nếu yêu cầu role_admin và token không có quyền admin
      if (role_admin && payload.role_admin == 0) {
        return this.redirectToLogin(
          response,
          'Bạn không có quyền truy cập vào tài nguyên này',
        )
      }
      // Nếu token hợp lệ và không cần quyền admin
      if (payload) {
        return true
      }
    } catch (error) {
      // Nếu có lỗi khi giải mã token (ví dụ: token hết hạn)
      return this.redirectToLogin(
        response,
        'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại',
      )
    }
    // Trả về false nếu không hợp lệ
    return this.redirectToLogin(
      response,
      'Đã xảy ra lỗi, vui lòng đăng nhập lại',
    )
  }
  // Hàm tiện ích để chuyển hướng và hiển thị thông báo lỗi
  private redirectToLogin (response: Response, message: string) {
    response.render('login', {
      message: message,
      status: 'error',
    })
    return false
  }
}
