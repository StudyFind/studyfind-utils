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

const MSDEVIATION = 10;

expect.extend({
  toBeWithinDeviation(received, expected, deviation) {
    const floor = expected - deviation;
    const ceiling = expected + deviation;
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

test("Check if getNow() returns current timestamp within 10ms", () => {
  expect(getNow()).toBeWithinDeviation(Date.now(), MSDEVIATION);
});

test("Check if getNowUTC() returns current UTC timestamp within 10ms", () => {
  expect(getNowUTC()).toBeWithinDeviation(new Date().getTime(), MSDEVIATION);
});

test("Check if getToday() returns today's YYYY-MM-DD", () => {
  expect(getToday()).toBe(new Date().toISOString().substring(0, 10));
});

test("Check if getYesterday() returns yesterday's YYYY-MM-DD", () => {
  let date = new Date();
  date.setDate(date.getDate() - 1);
  expect(getYesterday()).toBe(date.toISOString().substring(0, 10));
});

test("Check if getTomorrow() returns tomorrow's YYYY-MM-DD", () => {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  expect(getTomorrow()).toBe(date.toISOString().substring(0, 10));
});

test("Check if getStandardDate() returns current timestamp as YYYY-MM-DD", () => {
  expect(getStandardDate(Date.now())).toBe(
    new Date().toISOString().substring(0, 10)
  );
});

test("Check if getStandardDate() returns arbitrary timestamp as YYYY-MM-DD", () => {
  expect(getStandardDate(1628976226160)).toBe("2021-08-14");
});

test("Check if getStandardDate() returns empty parameter as current YYYY-MM-DD", () => {
  expect(getStandardDate()).toBe(new Date().toISOString().substring(0, 10));
});

test("Check if getStandardDate() returns undefined parameter as current YYYY-MM-DD", () => {
  expect(getStandardDate(undefined)).toBe(
    new Date().toISOString().substring(0, 10)
  );
});

test("Check if getStandardDate() returns null parameter as invalid", () => {
  expect(getStandardDate(null)).toBe("Invalid date");
});

test("Check if getStandardDate() returns random string as invalid", () => {
  expect(getStandardDate("hello")).toBe("Invalid date");
});

test("Check if getFriendlyDate() returns 'Today'.", () => {
  expect(getFriendlyDate(Date.now())).toBe("Today");
});

test("Check if getFriendlyDate() returns 'Yesterday'.", () => {
  let date = new Date();
  expect(getFriendlyDate(date.setDate(date.getDate() - 1))).toBe("Yesterday");
});

test("Check if getFriendlyDate() returns 'Tomorrow'.", () => {
  let date = new Date();
  expect(getFriendlyDate(date.setDate(date.getDate() + 1))).toBe("Tomorrow");
});

test("Check if getFriendlyDate() returns MMMM DD, YYYY for last week.", () => {
  let date = new Date();
  date.setDate(date.getDate() - 7);
  expect(getFriendlyDate(date)).toBe(
    date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    })
  );
});

test("Check if getFriendlyDate() returns MMMM DD, YYYY for arbitrary 02/29/1996.", () => {
  expect(getFriendlyDate(new Date(1996, 1, 29))).toBe("February 29, 1996");
});

test("Check if getFriendlyDate() returns empty parameter as Today.", () => {
  expect(getFriendlyDate()).toBe("Today");
});

test("Check if getFriendlyDate() returns arbitrary negative double parameter in MMMM DD, YYYY.", () => {
  expect(getFriendlyDate(-234.12)).toBe("December 31, 1969");
});

test("Check if getFriendlyDate() returns random string as invalid.", () => {
  expect(getFriendlyDate("fewnoeiwf")).toBe("Invalid date");
});

test("Check if get12HourTime() returns current h:mma.", () => {
  const time = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  expect(get12HourTime(Date.now())).toBe(time.toLowerCase().replace(" ", ""));
});

test("Check if get24HourTime() returns current HH:mm.", () => {
  const time = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });
  expect(get24HourTime(Date.now())).toBe(time);
});

test("Check if get24HourTime() returns current HH:mm.", () => {
  const time = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });
  expect(get24HourTime(Date.now())).toBe(time);
});

test("Check getRelativeTime() for a few seconds.", () => {
  let timestamp = Date.now();
  expect(getRelativeTime(timestamp - 5 * 1000)).toBe("a few seconds ago");
});

test("Check getRelativeTime() for a minute.", () => {
  let timestamp = Date.now();
  expect(getRelativeTime(timestamp - 60 * 1000)).toBe("a minute ago");
});

test("Check getRelativeTime() for a 5 minutes.", () => {
  let timestamp = Date.now();
  expect(getRelativeTime(timestamp - 5 * 60 * 1000)).toBe("5 minutes ago");
});

test("Check getRelativeTime() for an hour.", () => {
  let timestamp = Date.now();
  expect(getRelativeTime(timestamp - 60 * 60 * 1000)).toBe("an hour ago");
});

test("Check getRelativeTime() for 5 hours.", () => {
  let timestamp = Date.now();
  expect(getRelativeTime(timestamp - 5 * 60 * 60 * 1000)).toBe("5 hours ago");
});

test("Check getRelativeTime() for a day.", () => {
  let timestamp = Date.now();
  expect(getRelativeTime(timestamp - 24 * 60 * 60 * 1000)).toBe("a day ago");
});

test("Check getRelativeTime() for 5 days.", () => {
  let timestamp = Date.now();
  expect(getRelativeTime(timestamp - 5 * 24 * 60 * 60 * 1000)).toBe(
    "5 days ago"
  );
});

test("Check getRelativeTime() for a month.", () => {
  let timestamp = Date.now();
  expect(getRelativeTime(timestamp - 30 * 24 * 60 * 60 * 1000)).toBe(
    "a month ago"
  );
});

test("Check getRelativeTime() for 5 months.", () => {
  let timestamp = Date.now();
  expect(getRelativeTime(timestamp - 5 * 30 * 24 * 60 * 60 * 1000)).toBe(
    "5 months ago"
  );
});

test("Check getRelativeTime() for a year.", () => {
  let timestamp = Date.now();
  expect(getRelativeTime(timestamp - 365 * 24 * 60 * 60 * 1000)).toBe(
    "a year ago"
  );
});

test("Check getRelativeTime() for 5 years.", () => {
  let timestamp = Date.now();
  expect(getRelativeTime(timestamp - 5 * 365 * 24 * 60 * 60 * 1000)).toBe(
    "5 years ago"
  );
});

test("Check if getStandardTimezoneName() returns current timezone abbreviation.", () => {
  expect(
    getStandardTimezoneName(Intl.DateTimeFormat().resolvedOptions().timeZone)
  ).toBe(
    new Date()
      .toLocaleTimeString("default", { timeZoneName: "short" })
      .split(" ")[2]
  );
});

test("Check if getStandardTimezoneName() returns wrong timezone name format as UTC.", () => {
  expect(getStandardTimezoneName("Atlantic Standard Time")).toBe("UTC");
});

test("Check if getStandardTimezoneName() returns empty parameter as UTC.", () => {
  expect(getStandardTimezoneName()).toBe("UTC");
});

test("Check if getStandardTimezoneName() returns arbitrary timezone name as abbreviation.", () => {
  expect(getStandardTimezoneName("Asia/Magadan")).toBe("+11");
});

test("Check if getStandardTimezoneName() returns arbitrary timezone name as abbreviation.", () => {
  expect(getStandardTimezoneName("Europe/Budapest")).toBe("CEST");
});

test("Check if getTimestampFromDatetime() returns current UTC timestamp within a minute.", () => {
  const date = new Date().toISOString().substring(0, 10);
  const time24 = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });
  expect(getTimestampFromDatetime(date, time24)).toBeWithinDeviation(
    new Date().getTime(),
    60 * 1000
  );
});

test("Check if getTimestampFromDatetime() returns arbitrary UTC timestamp within a minute.", () => {
  expect(getTimestampFromDatetime("2021-08-14", "17:44")).toBeWithinDeviation(
    1628977444662,
    60 * 1000
  );
});
