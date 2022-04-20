import { ValidationOptions } from 'class-validator';
export declare function Match(property: string, validationOptions?: ValidationOptions): (object: {
    [key: string]: any;
}, propertyName: string) => void;
