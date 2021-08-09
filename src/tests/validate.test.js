const validate = require("../functions/validate")

//TESTS TO CHECK THE FUNCTIONALITY OF EMAIL VALIDATION
test("EMAIL | Nothing", () => {
    expect(validate["email"]()).toBe(" ")
})

test("EMAIL | Empty email", () => {
    expect(validate["email"]("")).toBe(" ")
})

test("EMAIL | Email only space", () => {
    expect(validate["email"](" ")).toBe("Email is invalid")
})

test("EMAIL | Email w/o special characters", () => {
    expect(validate["email"]("jwebb45gatechedu")).toBe("Email is invalid")
})

test("EMAIL | Email w/o @", () => {
    expect(validate["email"]("jwebb45gatech.edu")).toBe("Email is invalid")
})

test("EMAIL | Email w multiple @", () => {
    expect(validate["email"]("jwebb45@gat@ech.edu")).toBe("Email is invalid")
})

test("EMAIL | Email w/o .", () => {
    expect(validate["email"]("jwebb45@gatechedu")).toBe("Email is invalid")
})

test("EMAIL | Email no beginning", () => {
    expect(validate["email"]("@gatech.edu")).toBe("Email is invalid")
})

test("EMAIL | Email no middle", () => {
    expect(validate["email"]("jwebb45@.edu")).toBe("Email is invalid")
})

test("EMAIL | Email no ending", () => {
    expect(validate["email"]("jwebb45@gatech.")).toBe("Email is invalid")
})

test("EMAIL | Email with @ in identifier", () => {
    expect(validate["email"]("jwe@bb45@gatech.edu")).toBe("Email is invalid")
})

test("EMAIL | Email with @ in corporation", () => {
    expect(validate["email"]("jwebb45@gat@ech.edu")).toBe("Email is invalid")
})

test("EMAIL | Email with . in corporation", () => {
    expect(validate["email"]("jwebb45@gat.ech.edu")).toBe("")
})

test("EMAIL | Email with . in identifier", () => {
    expect(validate["email"]("jwe.bb45@gatech.edu")).toBe("")
})

test("EMAIL | .edu Email", () => {
    expect(validate["email"]("jwebb45@gatech.edu")).toBe("")
})

test("EMAIL | .org Email", () => {
    expect(validate["email"]("jwebb45@corporation.org")).toBe("")
})

test("EMAIL | .com Email", () => {
    expect(validate["email"]("jeremy.webb429@gmail.com")).toBe("")
})

test("EMAIL | .net Email", () => {
    expect(validate["email"]("jwebb45@corporation.net")).toBe("")
})

test("EMAIL | .gov Email", () => {
    expect(validate["email"]("jwebb45@corporation.gov")).toBe("")
})

//TESTS TO CHECK THE FUNCTIONALITY OF PASSWORD VALIDATION
test("PASSWORD | Nothing", () => {
    expect(validate["password"]()).toBe(" ")
})

test("PASSWORD | Empty password", () => {
    expect(validate["password"]("")).toBe(" ")
})

test("PASSWORD | Short password and no capital", () => {
    expect(validate["password"]("dga8es")).toBe("Password must have 8 characters and one capital letter")
})

test("PASSWORD | Short password", () => {
    expect(validate["password"]("Dbfads")).toBe("Password must have 8 characters")
})

test("PASSWORD | No capital", () => {
    expect(validate["password"]("dbmdfogois")).toBe("Password must have a capital letter")
})

test("PASSWORD | Regular password", () => {
    expect(validate["password"]("gfgDfgrwdf")).toBe("")
})

test("PASSWORD | Regular password with special character", () => {
    expect(validate["password"]("dsdfF@fadf")).toBe("")
})