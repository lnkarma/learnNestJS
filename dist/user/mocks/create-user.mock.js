"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaUser = exports.user = exports.createUserDto = void 0;
exports.createUserDto = {
    email: 'test@example.com',
};
exports.user = Object.assign(Object.assign({ id: '123', name: null }, exports.createUserDto), { isEmailVerified: false });
exports.prismaUser = Object.assign(Object.assign({}, exports.user), { password: null });
//# sourceMappingURL=create-user.mock.js.map