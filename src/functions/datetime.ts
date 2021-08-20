import * as moment from "moment";
import "moment-timezone";

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

const getNow = (): number => {
  return moment().valueOf();
};

const getNowUTC = (): number => {
  return moment().utc().valueOf();
};

const getToday = (): string => {
  return moment().format("YYYY-MM-DD");
};

const getYesterday = (): string => {
  return moment().add(-1, "days").format("YYYY-MM-DD");
};

const getTomorrow = (): string => {
  return moment().add(1, "days").format("YYYY-MM-DD");
};

const getStandardDate = (timestamp: number): string => {
  return moment(timestamp).format("YYYY-MM-DD");
};

const getFriendlyDate = (timestamp: number): string => {
  const standardDate = getStandardDate(timestamp);

  const today = getToday();
  const tomorrow = getTomorrow();
  const yesterday = getYesterday();

  if (standardDate === today) return "Today";
  if (standardDate === tomorrow) return "Tomorrow";
  if (standardDate === yesterday) return "Yesterday";

  return moment(timestamp).format("MMMM DD, YYYY");
};

const get12HourTime = (timestamp: number): string => {
  return moment(timestamp).format("h:mma");
};

const get24HourTime = (timestamp: number): string => {
  return moment(timestamp).format("HH:mm");
};

const getRelativeTime = (timestamp: number): string => {
  return moment(timestamp).fromNow();
};

const getStandardTimezoneName = (timezone: string): string => {
  return moment.tz(timezone).zoneAbbr();
};

const getTimestampFromDatetime = (time: string, date: string): number => {
  return moment(`${date} ${time}`).utc().valueOf();
};

module.exports = {
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
};
