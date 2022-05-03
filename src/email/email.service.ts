import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, SendMailOptions, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: this.configService.get('EMAIL_SERVICE_HOST'),
      port: this.configService.get('EMAIL_SERVICE_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get('EMAIL_SERVICE_USER'),
        pass: this.configService.get('EMAIL_SERVICE_PASS'),
      },
    });
  }
  sendEmail(sendMailOptions: SendMailOptions): void {
    this.transporter.sendMail(sendMailOptions);
  }
}
