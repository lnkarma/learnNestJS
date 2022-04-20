import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
export declare const createUserDto: CreateUserDto;
export declare const createUserDtoWithPassword: CreateUserDto;
export declare const user: UserEntity;
export declare const prismaUser: User;
