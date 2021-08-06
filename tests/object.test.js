// import object from "../functions/object";
const object = require("../functions/object");

const fullObject = {
    name: "Tom",
    id: 24500,
    children: {
        name: "Sue",
        id: 24501
    }
}

const partiallyFullObject = {
    name: "Tom",
    id: null,
    children: {
        name: "Sue",
        id: 24501
    }
}

const emptyObject = {}


//Keys test.
//Keys returns an array of keys as Strings
test("keys: Full object", () => {
  expect(object.keys(fullObject)).toStrictEqual(["name", "id", "children"]);
});

test("keys: Partially full object", () => {
  expect(object.keys(partiallyFullObject)).toStrictEqual(["name", "id", "children"]);
});

test("keys: empty object", () => {
  expect(object.keys(emptyObject)).toStrictEqual([]);
});

//Values testing. 
//Values returns an array of the values in the object.
test("values: Full object", () => {
  expect(object.values(fullObject)).toStrictEqual(["Tom", 24500, {"id": 24501, "name": "Sue"}]);
});

test("values: Partially full object", () => {
  expect(object.values(partiallyFullObject)).toStrictEqual(["Tom", null, {"id": 24501, "name": "Sue"}]);
});

test("values: Empty object", () => {
  expect(object.values(emptyObject)).toStrictEqual([]);
});

//Some testing. 
//Some checks if any part of the object is "truthy".
test("some: Full object", () => {
  expect(object.some(fullObject)).toBe(true);
});

test("some: Partially full object", () => {
  expect(object.some(partiallyFullObject)).toBe(true);
});

test("some: Empty object", () => {
  expect(object.some(emptyObject)).toBe(false);
});

