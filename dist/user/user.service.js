"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const runtime_1 = require("@prisma/client/runtime");
const prisma_service_1 = require("../prisma/prisma.service");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        try {
            const user = new user_entity_1.UserEntity(await this.prisma.user.create({
                data: dto,
            }));
            return { user, token: 'jwt' };
        }
        catch (error) {
            if (error instanceof runtime_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }
    findAll() {
        return `This action returns all user`;
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    update(id, updateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data: Object.assign({}, updateUserDto),
        });
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map