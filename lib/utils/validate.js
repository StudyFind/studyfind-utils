"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __importDefault(require("validator"));
var inferType = function (name) {
    var includesKeyword = function (keyword) { return name.toLowerCase().includes(keyword); };
    if (includesKeyword("email"))
        return "email";
    if (includesKeyword("password"))
        return "password";
    return "default";
};
var validate = {
    all: function (inputs) {
        var errors = {};
        for (var i in inputs) {
            if (inputs[i] !== undefined) {
                var type = inferType(i);
                errors[i] = validate[type](inputs[i]);
            }
        }
        return errors;
    },
    input: function (name, value) {
        var type = inferType(name);
        return validate[type](value);
    },
    email: function (email) {
        if (!email)
            return " ";
        if (!validator_1.default.isEmail(email))
            return "Email is invalid";
        return "";
    },
    password: function (password) {
        if (!password)
            return " ";
        var checkCase = password !== password.toLowerCase();
        var checkSize = password.length > 7;
        if (!checkCase && !checkSize)
            return "Password must have 8 characters and one capital letter";
        if (!checkCase)
            return "Password must have a capital letter";
        if (!checkSize)
            return "Password must have 8 characters";
        return "";
    },
    default: function (i) { return !i; },
};
module.exports = validate;
