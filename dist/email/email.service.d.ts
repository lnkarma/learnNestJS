import { ConfigService } from '@nestjs/config';
import { SendMailOptions } from 'nodemailer';
export declare class EmailService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendEmail(sendMailOptions: SendMailOptions): void;
}
