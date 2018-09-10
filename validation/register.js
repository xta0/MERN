const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  //check name
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 to 30 characters";
  }
  //check email
  if (!validator.isEmail(data.email)) {
    errors.email = "Email field incorrect";
  }
  //check password
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 to 30 characters";
  }
  //check confirm password
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Password not match";
  }

  return {
    errors,
    isvalid: isEmpty(errors)
  };
};
