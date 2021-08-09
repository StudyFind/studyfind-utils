const validate = require("../functions/validate")

//TESTS TO CHECK THE FUNCTIONALITY OF EMAIL VALIDATION
test("Nothing", () => {
    expect(validate["email"]()).toBe(" ")
})

test("Empty email", () => {
    expect(validate["email"]("")).toBe(" ")
})

test("Email only space", () => {
    expect(validate["email"](" ")).toBe("Email is invalid")
})

test("Email w/o special characters", () => {
    expect(validate["email"]("jwebb45gatechedu")).toBe("Email is invalid")
})

test("Email w/o @", () => {
    expect(validate["email"]("jwebb45gatech.edu")).toBe("Email is invalid")
})

test("Email w multiple @", () => {
    expect(validate["email"]("jwebb45@gat@ech.edu")).toBe("Email is invalid")
})

test("Email w/o .", () => {
    expect(validate["email"]("jwebb45@gatechedu")).toBe("Email is invalid")
})

test("Email no beginning", () => {
    expect(validate["email"]("@gatech.edu")).toBe("Email is invalid")
})

test("Email no middle", () => {
    expect(validate["email"]("jwebb45@.edu")).toBe("Email is invalid")
})

test("Email no ending", () => {
    expect(validate["email"]("jwebb45@gatech.")).toBe("Email is invalid")
})

test("Email with @ in identifier", () => {
    expect(validate["email"]("jwe@bb45@gatech.edu")).toBe("Email is invalid")
})

test("Email with @ in corporation", () => {
    expect(validate["email"]("jwebb45@gat@ech.edu")).toBe("Email is invalid")
})

test("Email with . in corporation", () => {
    expect(validate["email"]("jwebb45@gat.ech.edu")).toBe("")
})

test("Email with . in identifier", () => {
    expect(validate["email"]("jwe.bb45@gatech.edu")).toBe("")
})

test(".edu Email", () => {
    expect(validate["email"]("jwebb45@gatech.edu")).toBe("")
})

test(".org Email", () => {
    expect(validate["email"]("jwebb45@corporation.org")).toBe("")
})

test(".com Email", () => {
    expect(validate["email"]("jeremy.webb429@gmail.com")).toBe("")
})

test(".net Email", () => {
    expect(validate["email"]("jwebb45@corporation.net")).toBe("")
})

test(".gov Email", () => {
    expect(validate["email"]("jwebb45@corporation.gov")).toBe("")
})