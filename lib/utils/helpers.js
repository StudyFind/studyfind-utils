"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_timezone_1 = __importDefault(require("moment-timezone"));
var convertWeekdaysAndTimesToOffsets = function (weekdays, times) {
    var offsets = [];
    weekdays.forEach(function (bool, index) {
        bool &&
            times.forEach(function (time) {
                var _a = time.split(":"), hour = _a[0], minute = _a[1];
                var hours = 24 * index + parseInt(hour);
                var minutes = hours * 60 + parseInt(minute);
                var seconds = minutes * 60;
                var milliseconds = seconds * 1000;
                offsets.push(milliseconds);
            });
    });
    return offsets;
};
var convertOffsetsToWeekdaysAndTimes = function (offsets) {
    var weekdays = [false, false, false, false, false, false, false];
    var times = [];
    var MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
    var MILLISECONDS_IN_HOUR = 60 * 60 * 1000;
    var MILLISECONDS_IN_MINUTE = 60 * 1000;
    offsets.forEach(function (offset) {
        var weekday = Math.floor(offset / MILLISECONDS_IN_DAY);
        var daily = offset % MILLISECONDS_IN_DAY;
        var hours = Math.floor(daily / MILLISECONDS_IN_HOUR);
        var hourly = daily % MILLISECONDS_IN_HOUR;
        var minutes = Math.floor(hourly / MILLISECONDS_IN_MINUTE);
        var time = moment_timezone_1.default(hours + ":" + minutes, "H:m").format("HH:mm");
        weekdays[weekday] = true;
        if (!times.includes(time)) {
            times.push(time);
        }
    });
    return [weekdays, times];
};
module.exports = {
    convertWeekdaysAndTimesToOffsets: convertWeekdaysAndTimesToOffsets,
    convertOffsetsToWeekdaysAndTimes: convertOffsetsToWeekdaysAndTimes,
};
