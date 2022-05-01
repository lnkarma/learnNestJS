import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  sendEmail(
    to: string,
    { subject, message }: { subject: string; message: string },
  ): void {
    console.log({ to, subject, message });
  }
}
