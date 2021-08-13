const compute = require("../functions/compute")

responses = ["Yes", "Yes", "Yes"]

questions = [{type: "Inclusion"}, {type: "Inclusion"}, {type: "Inclusion"}]

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