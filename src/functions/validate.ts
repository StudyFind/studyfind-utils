import validator from "validator";

const inferType = (name: string) => {
  const includesKeyword = (keyword: string) => name.toLowerCase().includes(keyword);
  if (includesKeyword("email")) return "email";
  if (includesKeyword("password")) return "password";
  return "default";
};

const validate = {
  all: (inputs: {email: string, password: string}) => {
    const errors = {};

    for (const i in inputs) {
      if (inputs[i] !== undefined) {
        const type = inferType(i);
        errors[i] = validate[type](inputs[i]);
      }
    }
    return errors;
  },

  input: (name: string, value: string) => {
    const type = inferType(name);
    return validate[type](value);
  },

  email: (email: string) => {
    if (!email) return " ";
    if (!validator.isEmail(email)) return "Email is invalid";
    return "";
  },

  password: (password: string) => {
    if (!password) return " ";
    const checkCase = password !== password.toLowerCase();
    const checkSize = password.length > 7;

    if (!checkCase && !checkSize) return "Password must have 8 characters and one capital letter";
    if (!checkCase) return "Password must have a capital letter";
    if (!checkSize) return "Password must have 8 characters";
    return "";
  },

  default: (i: string) => !i,
};

module.exports = validate;
