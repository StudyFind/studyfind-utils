// import object from "../functions/object";
const object = require("../functions/object");

const fullObject = {
  name: "Tom",
  id: 24500,
  children: {
    name: "Sue",
    id: 24501,
  },
  num: 1,
};

const partiallyFullObject = {
  name: "Tom",
  id: null,
  children: {
    name: "Sue",
    id: 24501,
  },
  num: 0,
};

const emptyObject = {};

//add your own object to test here.
const customObj = {};

//Keys test.
//Keys returns an array of keys as Strings
test("keys: Full object", () => {
  expect(object.keys(fullObject)).toStrictEqual([
    "name",
    "id",
    "children",
    "num",
  ]);
});

test("keys: Partially full object", () => {
  expect(object.keys(partiallyFullObject)).toStrictEqual([
    "name",
    "id",
    "children",
    "num",
  ]);
});

test("keys: empty object", () => {
  expect(object.keys(emptyObject)).toStrictEqual([]);
});

test("keys: customObj", () => {
  expect(object.keys(customObj)).toStrictEqual(Object.keys(customObj));
});

//Values testing.
//Values returns an array of the values in the object.
test("values: Full object", () => {
  expect(object.values(fullObject)).toStrictEqual([
    "Tom",
    24500,
    { id: 24501, name: "Sue" },
    1,
  ]);
});

test("values: Partially full object", () => {
  expect(object.values(partiallyFullObject)).toStrictEqual([
    "Tom",
    null,
    { id: 24501, name: "Sue" },
    0,
  ]);
});

test("values: Empty object", () => {
  expect(object.values(emptyObject)).toStrictEqual([]);
});

test("values: customObj", () => {
  expect(object.values(customObj)).toStrictEqual(Object.values(customObj));
});

//map testing
//map applies a passed in function to each value in the object.

const testMap = (key, value) => {
  return value;
};

test("map: Full object", () => {
  expect(object.map(fullObject, testMap)).toStrictEqual(fullObject);
});

test("map: partiallyFull object", () => {
  expect(object.map(partiallyFullObject, testMap)).toStrictEqual(
    partiallyFullObject
  );
});

test("map: empty object", () => {
  expect(object.map(emptyObject, testMap)).toStrictEqual(emptyObject);
});

test("map: customObj", () => {
  expect(object.map(customObj, testMap)).toStrictEqual(customObj.name || {});
});

//filter testing
//filter applies a passed in filter function and returns only the elements of the object that pass that filter.
const testFilt = (key, value) => {
  if (key === "name") {
    return true;
  }
};

test("filter: Full object", () => {
  expect(object.filter(fullObject, testFilt)).toStrictEqual({ name: "Tom" });
});

test("filter: partiallyFull object", () => {
  expect(object.filter(partiallyFullObject, testFilt)).toStrictEqual({
    name: "Tom",
  });
});

test("filter: Full object", () => {
  expect(object.filter(emptyObject, testFilt)).toStrictEqual({});
});

test("filter: Customobj", () => {
  expect(object.filter(customObj, testFilt)).toStrictEqual(
    customObj.name || {}
  );
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

//every testing
//every checks if all values in the object are "truthy" and returns true only if all fields are "truthy".
//returns true on an empty object bc of the functions layout. Not sure if this is intentional.
test("every: Full object", () => {
  expect(object.every(fullObject)).toBe(true);
});

test("every: Partially full object", () => {
  expect(object.every(partiallyFullObject)).toBe(true);
});

test("every: Empty object", () => {
  expect(object.every(emptyObject)).toBe(true);
});
