import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateUserDto): Promise<{
        user: import(".prisma/client").User;
        token: string;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: string, updateUserDto: UpdateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User>;
    remove(id: number): string;
}
