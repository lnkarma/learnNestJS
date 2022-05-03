import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { EmailService } from './email.service';

jest.mock('nodemailer');
const mockedCreateTransport = createTransport as unknown as jest.Mock<
  typeof createTransport
>;

describe('EmailService', () => {
  let service: EmailService;
  let configService: ConfigService;
  const sendMail = jest.fn();

  beforeEach(async () => {
    mockedCreateTransport.mockReturnValue({
      sendMail,
    } as unknown as ReturnType<typeof mockedCreateTransport>);
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService, ConfigService],
    }).compile();

    service = module.get<EmailService>(EmailService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have a send email method', () => {
    expect(service.sendEmail).toBeDefined();
  });

  it('should call createTransporter from nodemailer', () => {
    new EmailService(configService);
    const createTransportParameters: SMTPTransport.Options = {
      host: configService.get('EMAIL_SERVICE_HOST'),
      port: configService.get('EMAIL_SERVICE_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: configService.get('EMAIL_SERVICE_USER'),
        pass: configService.get('EMAIL_SERVICE_PASS'),
      },
    };
    expect(createTransport).toHaveBeenCalledWith(createTransportParameters);
  });

  it('should call sendMail function from transporter instance', () => {
    service.sendEmail({});
    expect(sendMail).toHaveBeenCalled();
  });
});
