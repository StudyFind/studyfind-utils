const { keys, values, entries } = Object;

type mapFunc = (key: string, value: any) => any;

const map = (object, fn: mapFunc) => {
  const updated = {};

  entries(object).forEach(([key, value]) => {
    updated[key] = fn(key, value);
  });

  return updated;
};

type filterFunc = (key: string, value: any) => boolean;

const filter = (object, fn: filterFunc) => {
  const updated = {};

  entries(object).forEach(([key, value]) => {
    if (fn(key, value)) {
      updated[key] = value;
    }
  });

  return updated;
};

const some = (object: Object) => {
  let result = false;

  values(object).forEach((value, index) => {
    if (value) {
      result = true;
    }
  });

  return result;
};

const every = (object) => {
  let result = true;

  if (keys(object).length === 0) {
    return false;
  }

  keys(object).forEach((key) => {
    if (!object[key]) {
      result = false;
      return;
    }
  });

  return result;
};

// export default { keys, values, map, filter, some, every };

module.exports = {
  keys,
  values,
  map,
  filter,
  some,
  every,
};
