validateRegisterUser = (username, email, password, confirmPassword) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Please Enter Username";
  }

  if (email.trim() === "") {
    errors.email = "Please Enter Emial Address";
  } else {
    const regEx = /^[^\s@+]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(regEx)) {
      errors.email = "Please Enter a valid Email";
    }
  }

  if (password.length < 6) {
    errors.password = "Password Must Be Greater Than 6";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Confrim Password Must Be The Same as Password";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

validateLoginUser = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Please Enter Username";
  }

  if (password == "") {
    errors.password = "Please Enter Password";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports = { validateRegisterUser, validateLoginUser };
