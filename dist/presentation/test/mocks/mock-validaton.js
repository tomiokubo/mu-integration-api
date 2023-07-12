"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationSpy = void 0;
class ValidationSpy {
    constructor() {
        this.error = null;
    }
    validate(input) {
        this.input = input;
        return this.error;
    }
}
exports.ValidationSpy = ValidationSpy;
