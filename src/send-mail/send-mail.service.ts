import { Injectable } from '@nestjs/common'

@Injectable()
export class SendMailService {
  notificationJobStaff (
    name: string,
    email: string,
    jobTitle: string,
    jobDescription: string,
    startDate: string,
    endDate: string,
  ) {
    return {
      to: email,
      subject: 'Thông báo công việc mới',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thông báo công việc mới</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f7fa;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      background-color: #28a745;
      color: #ffffff;
      padding: 20px;
      border-radius: 6px 6px 0 0;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: bold;
    }
    .content {
      text-align: left;
      padding: 20px;
    }
    .content h2 {
      font-size: 22px;
      color: #333333;
    }
    .content p {
      font-size: 16px;
      color: #666666;
    }
    .content .job-details {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 5px;
      margin-top: 20px;
      border: 1px solid #ddd;
    }
    .content .job-details h3 {
      font-size: 18px;
      color: #007bff;
      margin-bottom: 10px;
    }
    .content .job-details p {
      font-size: 16px;
      margin: 5px 0;
    }
    .content .button {
      background-color: #007bff;
      color: #ffffff;
      padding: 12px 25px;
      text-decoration: none;
      font-size: 18px;
      border-radius: 5px;
      display: inline-block;
      margin-top: 20px;
    }
    .content .button:hover {
      background-color: #0056b3;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #999999;
      margin-top: 40px;
    }
    .footer a {
      color: #007bff;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Có công việc mới cho bạn!</h1>
    </div>
    <div class="content">
      <h2>Chào bạn, ${name}!</h2>
      <p>Chúng tôi muốn thông báo rằng có một công việc mới đang chờ bạn kiểm tra:</p>

      <div class="job-details">
        <h3>Thông tin công việc:</h3>
        <p><strong>Tên công việc:</strong> ${jobTitle}</p>
        <p><strong>Mô tả công việc:</strong> ${jobDescription}</p>
        <p><strong>Ngày bắt đầu:</strong> ${startDate}</p>
        <p><strong>Ngày kết thúc:</strong> ${endDate}</p>
      </div>

      <p>Vui lòng truy cập vào hệ thống để xác nhận và bắt đầu công việc.</p>

      <!-- Nút chuyển hướng đến website -->
      <a href="linkweb" class="button">Xem công việc mới</a>

      <p>Cảm ơn bạn đã đồng hành cùng chúng tôi!</p>
    </div>

    <div class="footer">
      <p>Chúc bạn một ngày làm việc hiệu quả!<br> Đội ngũ Thang Máy Tesla</p>
      <p><a href="mailto:support@thangmaitesla.com">Liên hệ với chúng tôi</a> nếu bạn gặp bất kỳ vấn đề nào.</p>
      <p>&copy; 2024 Thang Máy Tesla. Bảo mật và uy tín là cam kết của chúng tôi.</p>
    </div>
  </div>
</body>
</html>

`,
    }
  }
  forgotPassword (name: string, email: string, password: string) {
    return {
      to: email,
      subject: 'Thông báo đặt lại mật khẩu',
      html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yêu cầu đặt lại mật khẩu</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f7fa;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      background-color: #007bff;
      color: #ffffff;
      padding: 30px;
      border-radius: 6px 6px 0 0;
    }
    .header h1 {
      margin: 0;
      font-size: 30px;
      font-weight: 700;
    }
    .content {
      text-align: center;
      padding: 20px;
    }
    .content h2 {
      font-size: 24px;
      color: #333333;
    }
    .content p {
      font-size: 16px;
      color: #666666;
    }
    .content .password {
      font-size: 20px;
      font-weight: bold;
      color: #007bff;
      margin: 20px 0;
      padding: 10px;
      border: 1px solid #007bff;
      border-radius: 5px;
      background-color: #e6f1ff;
    }
    .content .button {
      background-color: #007bff;
      color: #ffffff;
      padding: 12px 25px;
      text-decoration: none;
      font-size: 18px;
      border-radius: 5px;
      margin-top: 20px;
      display: inline-block;
    }
    .content .button:hover {
      background-color: #0056b3;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #999999;
      margin-top: 40px;
    }
    .footer a {
      color: #007bff;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Yêu cầu đặt lại mật khẩu</h1>
    </div>
    <div class="content">
      <h2>Xin chào, ${name}</h2>
      <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn tại <strong>Thang Máy Tesla</strong>.</p>
      <p>Để tiếp tục, vui lòng sử dụng mật khẩu mới dưới đây:</p>
      <div class="password">${password}</div>
      <p>Để bảo mật tài khoản của bạn, chúng tôi khuyên bạn thay đổi mật khẩu sau khi đăng nhập.</p>
    </div>
    <div class="footer">
      <p>Chúc bạn một ngày tốt lành!<br> Đội ngũ <strong>Thang Máy Tesla</strong></p>
      <p>&copy; 2024 Thang Máy Tesla. Bảo mật và uy tín là cam kết của chúng tôi.</p>
    </div>
  </div>
</body>
</html>
`,
    }
  }
}
