"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedUser = exports.updateUserDto = void 0;
exports.updateUserDto = {
    email: 'test@example.com',
};
exports.updatedUser = Object.assign(Object.assign({ id: '123', name: null, email: 'old@example.com' }, exports.updateUserDto), { isEmailVerified: false });
//# sourceMappingURL=update-user.mock.js.map