"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_timezone_1 = __importDefault(require("moment-timezone"));
/*
==============================================================================
Database Formats
------------------------------------------------------------------------------
Always store dates in the database in the format "YYYY-MM-DD"
Always store times in the database as unix timestamps
==============================================================================
==============================================================================
Parameter Formats
------------------------------------------------------------------------------
timestamp => unix timestamp in milliseconds  Example: 1619834416000
timezone => item from moment-timezone list   Example: "America/New_York"
time => 12 hour format with meridian         Example: "9:49pm"
date => YYYY-MM-DD format                    Example: "2021-04-30"
==============================================================================
*/
var getNow = function () {
    return moment_timezone_1.default().valueOf();
};
var getNowUTC = function () {
    return moment_timezone_1.default().utc().valueOf();
};
var getToday = function () {
    return moment_timezone_1.default().format("YYYY-MM-DD");
};
var getYesterday = function () {
    return moment_timezone_1.default().add(-1, "days").format("YYYY-MM-DD");
};
var getTomorrow = function () {
    return moment_timezone_1.default().add(1, "days").format("YYYY-MM-DD");
};
var getStandardDate = function (timestamp) {
    return moment_timezone_1.default(timestamp).format("YYYY-MM-DD");
};
var getFriendlyDate = function (timestamp) {
    var standardDate = getStandardDate(timestamp);
    var today = getToday();
    var tomorrow = getTomorrow();
    var yesterday = getYesterday();
    if (standardDate === today)
        return "Today";
    if (standardDate === tomorrow)
        return "Tomorrow";
    if (standardDate === yesterday)
        return "Yesterday";
    return moment_timezone_1.default(timestamp).format("MMMM DD, YYYY");
};
var get12HourTime = function (timestamp) {
    return moment_timezone_1.default(timestamp).format("h:mma");
};
var get24HourTime = function (timestamp) {
    return moment_timezone_1.default(timestamp).format("HH:mm");
};
var getRelativeTime = function (timestamp) {
    return moment_timezone_1.default(timestamp).fromNow();
};
var getStandardTimezoneName = function (timezone) {
    return moment_timezone_1.default.tz(timezone).zoneAbbr();
};
var getTimestampFromDatetime = function (time, date) {
    return moment_timezone_1.default(date + " " + time).utc().valueOf();
};
module.exports = {
    getNow: getNow,
    getNowUTC: getNowUTC,
    getToday: getToday,
    getYesterday: getYesterday,
    getTomorrow: getTomorrow,
    getStandardDate: getStandardDate,
    getFriendlyDate: getFriendlyDate,
    get12HourTime: get12HourTime,
    get24HourTime: get24HourTime,
    getRelativeTime: getRelativeTime,
    getStandardTimezoneName: getStandardTimezoneName,
    getTimestampFromDatetime: getTimestampFromDatetime,
};
