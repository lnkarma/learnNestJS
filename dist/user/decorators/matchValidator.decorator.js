"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
const class_validator_1 = require("class-validator");
function Match(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'Match',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    return value === relatedValue;
                },
            },
        });
    };
}
exports.Match = Match;
//# sourceMappingURL=matchValidator.decorator.js.map