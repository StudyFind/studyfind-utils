const {
  convertWeekdaysAndTimesToOffsets,
  convertOffsetsToWeekdaysAndTimes,
} = require("../functions/helpers");

test("convertWeekdaysAndTimesToOffsets()", () => {
  expect(
    convertWeekdaysAndTimesToOffsets(
      [false, false, true, true, false, false, true],
      ["18:00"]
    )
  ).toStrictEqual([237600000, 324000000, 583200000]);
});

test("convertOffsetsToWeekdaysAndTimes()", () => {
  expect(
    convertOffsetsToWeekdaysAndTimes([237600000, 324000000, 583200000])
  ).toStrictEqual([[false, false, true, true, false, false, true], ["18:00"]]);
});
