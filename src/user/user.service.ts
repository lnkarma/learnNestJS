import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { SUBJECT, TEXT } from 'src/constants/verifyEmail.constants';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { IJwtTokenPayload } from './types/jwtToken.type';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async create(dto: CreateUserDto) {
    try {
      delete dto.passwordConfirm;
      const user = new UserEntity(
        await this.prisma.user.create({
          data: dto,
        }),
      );

      const tokenPayload: IJwtTokenPayload = {
        id: user.id,
        email: user.email,
      };

      const token = this.jwtService.sign(tokenPayload);
      // TODO: generage jwt token for email verification.
      // TODO: send that token for email verification.
      // TODO: send html with some templace engine.
      this.emailService.sendEmail({
        to: user.email,
        subject: SUBJECT,
        text: TEXT,
      });
      return { user, token };
    } catch (error) {
      console.log({ error });
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne({ id, email }: { id?: string; email?: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id: id, email: email },
    });

    if (!user) return null;
    return new UserEntity(user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
