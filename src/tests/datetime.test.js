const {
  getNow,
  getNowUTC,
  getToday,
  getYesterday,
  getTomorrow,
  getStandardDate,
  getFriendlyDate,
  get12HourTime,
  get24HourTime,
  getRelativeTime,
  getStandardTimezoneName,
  getTimestampFromDatetime,
} = require("../functions/datetime");

test("UTC timestamp 1628027081338 to 12 hour time (just EST for now)", () => {
  expect(get12HourTime(1628027081338)).toBe("5:44pm");
});
