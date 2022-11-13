///////////////////////////////////////////////////////////////////
// Basmetoder
//////////////////////////////////////////////////////////////

//Kollar password så att den fyller kriterierna.
export const validatePassword = (password) => {
  if (!password) {
    return "Fyll i lösenord";
  } else if (password.length < 8 || password.length > 50) {
    return "Lösenordet måste vara minst 8 och max 50 tecken långt";
  } else if (
    !new RegExp(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/
    ).test(password)
  ) {
    return "Lösenordet måste innehålla en stor bokstav, en liten bokstav, en siffra och ett specialtecken";
  }

  return "";
};

///Kollar om det finns email inskrivet, Kollar om den innehåller @ tecken.

export const validateEmail = (email) => {
  if (!email) {
    return "Fyll i email";
  } else if (!new RegExp(/[^@ ]+@[^@ ]+\.[^@ .]{2,}/).test(email)) {
    return "Måste vara en giltig email";
  }

  return "";
};

//Kollar så att name fyller kriterierna.
export const validateName = (name) => {
  if (!name) {
    return "Vänligen fyll i samtliga uppgifter för att skapa kurstillfälle";
  } else if (!new RegExp(/^[A-Öa-ö]+$/).test(name) || name.length > 100) {
    return "Får endast innehålla bokstäver och vara max 100 tecken långt";
  }

  return "";
};

//////////////////////////////////////////////////////////////////////////
// Componentspecifika metoder som kallar på basmetoder
///////////////////////////////////////////////////////////////

// Kollar signIn så att det fyller kraven och sätter meddelande

export const validateInputsSignIn = (userInput) => {
  const emailError = validateEmail(userInput.email);
  const passwordError = validatePassword(userInput.password);

  if (emailError === "" && passwordError === "") {
    return "";
  } else {
    return "Kontrollera att du angivit rätt E-post och lösenord";
  }
};

// Kollar CourseOccasion så att det fyller kraven och sätter meddelande

export const validateInputsCourseOccasion = (userInput) => {
  const nameError = validateName(userInput);

  if (nameError == "") {
    return "";
  } else {
    return nameError;
  }
};

// Kollar CreateAccount så att det fyller kraven och sätter meddelande

export const validateInputsCreateAccount = (userinputs) => {
  console.log(userinputs)
  const firstNameError = validateName(userinputs.firstName);
  const lastNameError = validateName(userinputs.lastName);
  const emailError = validateEmail(userinputs.email);
  const passwordError = validatePassword(userinputs.password);
  if (
    firstNameError == "" &&
    lastNameError == "" &&
    emailError == "" &&
    passwordError == ""
  ) {
    return "";
  }
  if(firstNameError!=""){
    return firstNameError
  }
  if(lastNameError!=""){
    return lastNameError
  }
  if(emailError!=""){
    return emailError
  }
  if(passwordError!=""){
    return passwordError
  }
};
