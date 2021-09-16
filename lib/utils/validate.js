"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __importDefault(require("validator"));
var name = function (value) {
    var isEmpty = !value;
    if (isEmpty)
        return "Name is required";
    return "";
};
var email = function (value) {
    var isEmpty = !value;
    var isInvalid = !validator_1.default.isEmail(value);
    if (isEmpty)
        return "Email is required";
    if (isInvalid)
        return "Email is invalid";
    return "";
};
var password = function (value) {
    var isEmpty = !value;
    var isTooShort = value.length < 8;
    var isMissingUpperCase = value === value.toLowerCase();
    if (isEmpty)
        return "Password is required";
    if (isTooShort)
        return "Password must have at least 8 characters";
    if (isMissingUpperCase)
        return "Password must have a capital letter";
    return "";
};
var url = function (value) {
    var isEmpty = !value;
    var isInvalid = !validator_1.default.isURL(value); // does not check for http:// or https://
    var isNotSecure = value.substring(0, 8) !== "https://";
    if (isEmpty)
        return "URL is required";
    if (isInvalid)
        return "URL is invalid";
    if (isNotSecure)
        return "URL must begin with https://";
    return "";
};
var date = function (value) {
    var isEmpty = !value;
    var isInvalid = !validator_1.default.isDate(value, { format: "YYYY-MM-DD", delimiters: ["-"] });
    if (isEmpty)
        return "Date is required";
    if (isInvalid)
        return "Date is invalid";
    return "";
};
var time = function (value) {
    var isEmpty = !value;
    var isInvalid = !/(?:[01][0-9]|2[0-3]):(?:[0-5][0-9])/.test(value);
    if (isEmpty)
        return "Time is required";
    if (isInvalid)
        return "Time is invalid";
    return "";
};
exports.default = { email: email, password: password, url: url, date: date, time: time };
