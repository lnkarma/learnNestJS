import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
export declare class UserService {
    private prisma;
    private jwtService;
    private emailService;
    constructor(prisma: PrismaService, jwtService: JwtService, emailService: EmailService);
    create(dto: CreateUserDto): Promise<{
        user: UserEntity;
        token: string;
    }>;
    findAll(): string;
    findOne({ id, email }: {
        id?: string;
        email?: string;
    }): Promise<UserEntity | null>;
    update(id: string, updateUserDto: UpdateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User>;
    remove(id: number): string;
}
