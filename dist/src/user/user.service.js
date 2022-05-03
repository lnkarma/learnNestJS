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
const jwt_1 = require("@nestjs/jwt");
const runtime_1 = require("@prisma/client/runtime");
const verifyEmail_constants_1 = require("../../constants/verifyEmail.constants");
const email_service_1 = require("../email/email.service");
const prisma_service_1 = require("../prisma/prisma.service");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(prisma, jwtService, emailService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async create(dto) {
        try {
            delete dto.passwordConfirm;
            const user = new user_entity_1.UserEntity(await this.prisma.user.create({
                data: dto,
            }));
            const tokenPayload = {
                id: user.id,
                email: user.email,
            };
            const token = this.jwtService.sign(tokenPayload);
            this.emailService.sendEmail({
                to: user.email,
                subject: verifyEmail_constants_1.SUBJECT,
                text: verifyEmail_constants_1.TEXT,
            });
            return { user, token };
        }
        catch (error) {
            console.log({ error });
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
    async findOne({ id, email }) {
        const user = await this.prisma.user.findUnique({
            where: { id: id, email: email },
        });
        if (!user)
            return null;
        return new user_entity_1.UserEntity(user);
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
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        email_service_1.EmailService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map