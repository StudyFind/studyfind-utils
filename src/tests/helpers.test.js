const {
  convertWeekdaysAndTimesToOffsets,
  convertOffsetsToWeekdaysAndTimes,
} = require("../functions/helpers");

// handleable cases

describe("convertWeekdaysAndTimesToOffsets() handleable cases", () => {
  test("convertWeekdaysAndTimesToOffsets() expected input", () => {
    expect(
      convertWeekdaysAndTimesToOffsets(
        [false, false, true, true, false, false, true],
        ["18:00"]
      )
    ).toStrictEqual([237600000, 324000000, 583200000]);
  });

  test("convertWeekdaysAndTimesToOffsets() beginning of week", () => {
    expect(
      convertWeekdaysAndTimesToOffsets(
        [true, false, false, false, false, false, false],
        ["00:00"]
      )
    ).toStrictEqual([0]);
  });

  test("convertWeekdaysAndTimesToOffsets() end of week", () => {
    expect(
      convertWeekdaysAndTimesToOffsets(
        [false, false, false, false, false, false, true],
        ["23:59"]
      )
    ).toStrictEqual([604740000]);
  });

  test("convertWeekdaysAndTimesToOffsets() empty weekday", () => {
    expect(convertWeekdaysAndTimesToOffsets([], ["18:00"])).toStrictEqual([]);
  });

  test("convertWeekdaysAndTimesToOffsets() empty times", () => {
    expect(
      convertWeekdaysAndTimesToOffsets(
        [false, false, true, true, false, false, true],
        []
      )
    ).toStrictEqual([]);
  });

  test("convertWeekdaysAndTimesToOffsets() both arrays empty", () => {
    expect(convertWeekdaysAndTimesToOffsets([], [])).toStrictEqual([]);
  });

  test("convertWeekdaysAndTimesToOffsets() extra parameter", () => {
    expect(
      convertWeekdaysAndTimesToOffsets(
        [false, false, true, true, false, false, true],
        ["06:00"],
        8320472.2
      )
    ).toStrictEqual([194400000, 280800000, 540000000]);
  });

  test("convertWeekdaysAndTimesToOffsets() falsy values", () => {
    expect(
      convertWeekdaysAndTimesToOffsets(
        [0, NaN, true, true, null, "", true],
        ["06:00"]
      )
    ).toStrictEqual([194400000, 280800000, 540000000]);
  });
});

// cases to handle

describe("convertWeekdaysAndTimesToOffsets() cases to handle (maybe these tests shouldn't pass)", () => {
  test("convertWeekdaysAndTimesToOffsets() missing weekdays", () => {
    expect(() => convertWeekdaysAndTimesToOffsets(["18:00"])).toThrow(
      TypeError("Cannot read property 'forEach' of undefined")
    );
  });

  test("convertWeekdaysAndTimesToOffsets() missing times", () => {
    expect(() =>
      convertWeekdaysAndTimesToOffsets([
        false,
        false,
        true,
        true,
        false,
        false,
        true,
      ])
    ).toThrow(TypeError("Cannot read property 'forEach' of undefined"));
  });

  test("convertWeekdaysAndTimesToOffsets() missing inputs", () => {
    expect(() => convertWeekdaysAndTimesToOffsets()).toThrow(
      TypeError("Cannot read property 'forEach' of undefined")
    );
  });

  test("convertWeekdaysAndTimesToOffsets() wrong weekday size", () => {
    expect(
      convertWeekdaysAndTimesToOffsets(
        [false, false, true, true, false, false],
        ["18:00"]
      )
    ).toStrictEqual([237600000, 324000000]);
  });

  test("convertWeekdaysAndTimesToOffsets() wrong weekday size overflow", () => {
    expect(
      convertWeekdaysAndTimesToOffsets(
        [false, false, true, true, false, false, false, true],
        ["18:00"]
      )
    ).toStrictEqual([237600000, 324000000, 669600000]);
  });

  test("convertWeekdaysAndTimesToOffsets() invalid time format (h:mma, offset 12 hrs too early if pm)", () => {
    expect(
      convertWeekdaysAndTimesToOffsets(
        [false, false, true, true, false, false, true],
        ["6:00pm"]
      )
    ).toStrictEqual([194400000, 280800000, 540000000]);
  });

  test("convertWeekdaysAndTimesToOffsets() time not in array", () => {
    expect(() =>
      convertWeekdaysAndTimesToOffsets(
        [false, false, true, true, false, false, true],
        "06:00"
      )
    ).toThrow(TypeError("times.forEach is not a function"));
  });

  test("convertWeekdaysAndTimesToOffsets() noise in arrays", () => {
    expect(() =>
      convertWeekdaysAndTimesToOffsets(
        [false, false, "ifeowheifaoiehao", true, true, false, false, true],
        ["06:00", 23, 532.3, undefined, "few"]
      )
    ).toThrow(
      TypeError(
        "time.split is not a function or its return value is not iterable"
      )
    );
  });

  test("convertWeekdaysAndTimesToOffsets() wrong parameter types", () => {
    expect(() => convertWeekdaysAndTimesToOffsets(234, "wefwef")).toThrow(
      TypeError("weekdays.forEach is not a function")
    );
  });

  test("convertWeekdaysAndTimesToOffsets() undefined parameters", () => {
    expect(() => convertWeekdaysAndTimesToOffsets(undefined, null)).toThrow(
      TypeError("Cannot read property 'forEach' of undefined")
    );
  });
});

// handleable cases

describe("convertOffsetsToWeekdaysAndTimes() handleable cases", () => {
  test("convertOffsetsToWeekdaysAndTimes() expected input", () => {
    expect(
      convertOffsetsToWeekdaysAndTimes([237600000, 324000000, 583200000])
    ).toStrictEqual([
      [false, false, true, true, false, false, true],
      ["18:00"],
    ]);
  });

  test("convertOffsetsToWeekdaysAndTimes() beginning of week", () => {
    expect(convertOffsetsToWeekdaysAndTimes([0])).toStrictEqual([
      [true, false, false, false, false, false, false],
      ["00:00"],
    ]);
  });

  test("convertOffsetsToWeekdaysAndTimes() end of week", () => {
    expect(convertOffsetsToWeekdaysAndTimes([604740000])).toStrictEqual([
      [false, false, false, false, false, false, true],
      ["23:59"],
    ]);
  });

  test("convertOffsetsToWeekdaysAndTimes() empty offsets", () => {
    expect(convertOffsetsToWeekdaysAndTimes([])).toStrictEqual([
      [false, false, false, false, false, false, false],
      [],
    ]);
  });

  test("convertOffsetsToWeekdaysAndTimes() extra parameter", () => {
    expect(
      convertOffsetsToWeekdaysAndTimes([237600000, 324000000, 583200000], NaN)
    ).toStrictEqual([
      [false, false, true, true, false, false, true],
      ["18:00"],
    ]);
  });

  test("convertOffsetsToWeekdaysAndTimes() float input", () => {
    expect(
      convertOffsetsToWeekdaysAndTimes([237600000.0, 324000000.0, 583200000.0])
    ).toStrictEqual([
      [false, false, true, true, false, false, true],
      ["18:00"],
    ]);
  });

  test("convertOffsetsToWeekdaysAndTimes() small interval", () => {
    expect(
      convertOffsetsToWeekdaysAndTimes([237600001, 324000020, 583200321])
    ).toStrictEqual([
      [false, false, true, true, false, false, true],
      ["18:00"],
    ]);
  });
});

// cases to handle

describe("convertOffsetsToWeekdaysAndTimes() cases to handle (maybe these tests shouldn't pass)", () => {
  test("convertOffsetsToWeekdaysAndTimes() missing input", () => {
    expect(() => convertOffsetsToWeekdaysAndTimes()).toThrow(
      TypeError("Cannot read property 'forEach' of undefined")
    );
  });

  test("convertOffsetsToWeekdaysAndTimes() unsorted input", () => {
    expect(
      convertOffsetsToWeekdaysAndTimes([237600000, 583200000, 324000000])
    ).toStrictEqual([
      [false, false, true, true, false, false, true],
      ["18:00"],
    ]);
  });

  test("convertOffsetsToWeekdaysAndTimes() noise in array", () => {
    expect(
      JSON.stringify(
        convertOffsetsToWeekdaysAndTimes([
          undefined,
          237600000,
          324000000,
          "ewfw",
          583200000,
        ])
      )
    ).toEqual(
      JSON.stringify([
        [false, false, true, true, false, false, true],
        ["Invalid date", "18:00"],
      ])
    );
  });

  test("convertOffsetsToWeekdaysAndTimes() wrong parameter types", () => {
    expect(() => convertOffsetsToWeekdaysAndTimes("234")).toThrow(
      TypeError("offsets.forEach is not a function")
    );
  });

  test("convertOffsetsToWeekdaysAndTimes() wrong parameter types", () => {
    expect(() => convertOffsetsToWeekdaysAndTimes(234)).toThrow(
      TypeError("offsets.forEach is not a function")
    );
  });

  test("convertOffsetsToWeekdaysAndTimes() undefined parameter", () => {
    expect(() => convertOffsetsToWeekdaysAndTimes(undefined)).toThrow(
      TypeError("Cannot read property 'forEach' of undefined")
    );
  });
});
