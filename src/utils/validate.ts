import validator from "validator";

const name = (value: string) => {
  const isEmpty = !value;

  if (isEmpty) return "Name is required";
  return "";
};

const email = (value: string) => {
  const isEmpty = !value;
  const isInvalid = !validator.isEmail(value);

  if (isEmpty) return "Email is required";
  if (isInvalid) return "Email is invalid";
  return "";
};

const password = (value: string) => {
  const isEmpty = !value;
  const isTooShort = value.length < 8;
  const isMissingUpperCase = value === value.toLowerCase();

  if (isEmpty) return "Password is required";
  if (isTooShort) return "Password must have at least 8 characters";
  if (isMissingUpperCase) return "Password must have a capital letter";
  return "";
};

const url = (value: string) => {
  const isEmpty = !value;
  const isInvalid = !validator.isURL(value); // does not check for http:// or https://
  const isNotSecure = value.substring(0, 8) !== "https://";

  if (isEmpty) return "URL is required";
  if (isInvalid) return "URL is invalid";
  if (isNotSecure) return "URL must begin with https://";
  return "";
};

const date = (value: string) => {
  const isEmpty = !value;
  const isInvalid = !validator.isDate(value, { format: "YYYY-MM-DD", delimiters: ["-"] });

  if (isEmpty) return "Date is required";
  if (isInvalid) return "Date is invalid";
  return "";
};

const time = (value: string) => {
  const isEmpty = !value;
  const isInvalid = !/(?:[01][0-9]|2[0-3]):(?:[0-5][0-9])/.test(value);

  if (isEmpty) return "Time is required";
  if (isInvalid) return "Time is invalid";
  return "";
};

export default { name, email, password, url, date, time };