const compute = require("../functions/compute")

const testText = require("../testText")

const testText = {
    research: "By definition, M-theory is the 11-dimensional theory that via compactification on a circle S 1 is equivalent to ten-dimensional type IIA string theory [ 1,2]. The string coupling constant gs emerges in this correspondence as the radius of the S I, while the particles with non-zero KK-momentum along the S 1 are identified with the D-particles of the IIA model. According to the matrix theory proposal put forward in [3], the full dynamics of M-theory can be captured by means of an appropriate large N limit of supersymmetric matrix quantum mechanics. In the original correspondence with the type IIA string, the matrix degrees of freedom find their origin in the collective dynamics of the D-particles [4-6]. The key new ingredient in the approach of [3], however, is that the large N limit effectively accomplishes a decompactification of the extra 1 lth direction, which therefore should be treated on the exact same footing as all the other uncompactified dimensions. This insight, albeit still conjectural, provides a number of important new theoretical tools.",
    homework: "Lets begin by defining a two-tape TM M to emulate our Mod-machineon.  This choice in TM is fine since multi-tape TM’s are equivalentin power to single tape TM’s.  M would begin in the Mod-machinesstart state with 0s written on each of the tapes (since I assume thecounters begin at 0).  Given any mod-machine transition of the form(qi,0,1)→(qj, act1, act2) we can adapt it for use in M like so:  Eachstateqiwill have 2 new intermediate states that are transitioned todepending on the reading of the first tape (i.e.  we would transitionto a state that essentially remembers the first reading).  From thisintermediate state, we read from the second counter and transition toqjas it is defined in the rule (basically looks like:  (qi,0)→(qi0,1)→(qj, act1, act2)).  Now inqjwe would have to add 2 new action statesthat are immediately transitioned to.  The first state applies action1  on  tape  1,  then  transitions  to  the  second  which  applies  action  2on  tape  2.   The  second  then  transitions  back  intoqj.   Fromqjwerepeat  the  process  like  we  did  toqi.   The  remaining  properties  ofM can just be copied over from the Mod-machine.  Since we couldemulate a mod-machine on our Turing machine M, we can concludethat mod-machines are at least as powerful",
    shortStory: "Once upon a time there was an old mother pig who had three little pigs and not enough food to feed them. So when they were old enough, she sent them out into the world to seek their fortunes. The first little pig was very lazy. He didn't want to work at all and he built his house out of straw. The second little pig worked a little bit harder but he was somewhat lazy too and he built his house out of sticks. Then, they sang and danced and played together the rest of the day. The third little pig worked hard all day and built his house with bricks. It was a sturdy house complete with a fine fireplace and chimney. It looked like it could withstand the strongest winds.",
    essay: "Defining equity to be equal access to opportunity or provided and desired resource, the floorplan of the Kendeda Building is designed in an attempt to maintain aural equity throughout the building and provide ample study and social space. Features of the classrooms and the lecture hall dissipate the sound from the main floor and provide different soundscapes that appeal to many different patrons. The first floor features a large open space which will act as the primary social hub. Most looking to talk with friends over coffee or just hang out and pass some time will flock here making it the main contributor to sound in the building. Other spaces are scattered throughout that are to be utilized as quiet areas. As Anthony Kimpton says in his excerpt, accessibility is important when considering public space and the equity surrounding it. The features of these quiet areas increase the accessibility to quiet space balancing out the two environments of the building and providing equity. If the classrooms were on the first floor with the open space, the sound from this area would drone into the classrooms eliminating the focused environment. Putting the classrooms on the second floor and including sound absorbing designs in the wood floor provides a better and quieter environment more suited to learning rather than socializing. Similar thought went into the lecture halls. Being on the first floor, the droning sound is also a problem. To overcome this, absorbent paneling was included to dissipate unwanted sound and project lecturers’ voices. The steps taken to provide equal access to socialization as well as study in the Kendeda Building’s aural architecture ensures equity for its patrons."
}

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
FOR SOME REASON DIFFERENT TESTERS ONLINE RETURN DIFFERENT RESULTS (MIGHT HAVE TO DO WITH THEIR OWN BIASES)
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

test("READABILITY | Short story", () => {
    expect(compute["readabilityIndex"](testText.shortStory)).toBeWithinRange(90, 100)
})

test("READABILITY" | "Homework", () => {
    expect(compute["readabilityIndex"](testText.homework))/toBeWithinRange(85, 95)
})

test("READABILITY" | "Research", () => {
    expect(compute["readabilityIndex"](testText.homework))/toBeWithinRange(40, 50)
})