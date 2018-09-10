const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //check email
  if (!validator.isEmail(data.email)) {
    errors.email = "Email field incorrect";
  }
  //check password
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 to 30 characters";
  }
  return {
    errors,
    isvalid: isEmpty(errors)
  };
};
