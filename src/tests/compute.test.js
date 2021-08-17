const compute = require("../functions/compute")

const testText = require("../testText")

responses = ["Yes", "Yes", "Yes"]

questions = [{type: "Inclusion"}, {type: "Inclusion"}, {type: "Inclusion"}]

expect.extend({
    toBeWithinRange(received, floor, ceiling) {
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

//TESTS FOR ELIGIBILITY SCORE

test("ELIGIBILITY | Nothing", () => {
    expect(compute["eligibilityScore"]()).toBe(0)
})

test("ELIGIBILITY | Empty questions", () => {
    expect(compute["eligibilityScore"]({}, responses)).toBe(0)
})

test("ELIGIBILITY | Empty responses", () => {
    expect(compute["eligibilityScore"](questions, [])).toBe(0)
})

test("ELIGIBILITY | Undefined questions", () => {
    expect(compute["eligibilityScore"](undefined, responses)).toBe(0)
})

test("ELIGIBILITY | Undefined responses", () => {
    expect(compute["eligibilityScore"](questions, undefined)).toBe(0)
})

test("ELIGIBILITY | All inclusion and yes", () => {
    expect(compute["eligibilityScore"](questions, responses)).toBe(100)
})

test("ELIGIBILITY | All exclusion and yes", () => {
    questions = [{type: "Exclusion"}, {type: "Exclusion"}, {type: "Exclusion"}]
    expect(compute["eligibilityScore"](questions, responses)).toBe(0)
})

test("ELIGIBILITY | All inclusion and no", () => {
    responses = ["No", "No", "No"]
    questions = [{type: "Inclusion"}, {type: "Inclusion"}, {type: "Inclusion"}]
    expect(compute["eligibilityScore"](questions, responses)).toBe(0)
})

test("ELIGIBILITY | All exclusion and no", () => {
    questions = [{type: "Exclusion"}, {type: "Exclusion"}, {type: "Exclusion"}]
    responses = ["No", "No", "No"]
    expect(compute["eligibilityScore"](questions, responses)).toBe(100)
})

test("ELIGIBILITY | 1 mismatch", () => {
    questions = [{type: "Exclusion"}, {type: "Exclusion"}, {type: "Exclusion"}, {type: "Inclusion"}]
    responses = ["No", "No", "No", "No"]
    expect(compute["eligibilityScore"](questions, responses)).toBe(75)
})

test("ELIGIBILITY | 2 mismatch", () => {
    questions = [{type: "Exclusion"}, {type: "Exclusion"}, {type: "Inclusion"}, {type: "Inclusion"}]
    responses = ["No", "No", "No", "No"]
    expect(compute["eligibilityScore"](questions, responses)).toBe(50)
})

/*
TESTS FOR READABILITY INDEX
FOR SOME REASON DIFFERENT TESTERS ONLINE RETURN DIFFERENT RESULTS (MIGHT HAVE TO DO WITH BIAS)
https://charactercalculator.com/flesch-reading-ease/
https://readabilityformulas.com/freetests/six-readability-formulas.php
https://www.textcompare.org/readability/flesch-kincaid-reading-ease/
HOWEVER THEY ARE ALL WITHIN A COUPLE POINTS OF EACHOTHER SO I BELIEVE USING toBeWithinRange IS SUFFICIENT
*/

test("READABILITY | Nothing", () => {
    expect(compute["readabilityIndex"]()).toBe(null)
})

test("READABILITY | Empty", () => {
    expect(compute["readabilityIndex"]("")).toBe(null)
})

test("READABILITY | Essay", () => {
    expect(compute["readabilityIndex"](testText.essay)).toBeWithinRange(60, 70)
})