import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        EMAIL_SERVICE_HOST: Joi.string().required(),
        EMAIL_SERVICE_PORT: Joi.number().required(),
        EMAIL_SERVICE_USER: Joi.string().required(),
        EMAIL_SERVICE_PASS: Joi.string().required(),
      }).options({
        abortEarly: false,
      }),
    }),
    UserModule,
    PrismaModule,
    AuthModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
