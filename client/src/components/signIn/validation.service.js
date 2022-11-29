///////////////////////////////////////////////////////////////////
// Basmetoder
//////////////////////////////////////////////////////////////

//Kollar password så att den fyller kriterierna.
export const validatePassword = (password) => {
  if (!password) {
    return "Vänligen fyll i samtliga uppgifter";
  } else if (
    !new RegExp(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/
    ).test(password.trim()) ||
    password.length < 8 ||
    password.length > 50
  ) {
    return "Lösenordet måste innehålla 8-50 tecken, minst en stor bokstav, en liten bokstav, en siffra samt ett specialtecken (!&?-#)";
  }
  return "";
};

///Kollar om det finns email inskrivet, får innehålla tecken, bokstäverKollar om den innehåller @ tecken.

export const validateEmail = (email) => {
  if (!email) {
    return "Vänligen fyll i samtliga uppgifter";
  } else if (
    !new RegExp(/^[A-Ö0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i).test(
      email.trim()
    ) ||
    email.length > 50
  ) {
    return "Kontrollera att du angivit en giltig email";
  }
  return "";
};

//Kollar så att name fyller kriterierna.
export const validateName = (name, maxLength) => {
  if (!name) {
    return "Vänligen fyll i samtliga uppgifter";
  } else if (
    !new RegExp(/^[A-Öa-ö\s]*$/).test(name.trim()) ||
    name.length > maxLength
  ) {
    return `Får endast innehålla bokstäver och vara max ${maxLength} tecken långt`;
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
  const nameError = validateName(userInput.name, 100);

  const courseOrganizerError = validateName(userInput.courseorganizer, 100);
  if (nameError == "" && courseOrganizerError == "") {
    return "";
  }
  if (nameError != "") {
    return nameError;
  }
  if (courseOrganizerError != "") {
    return courseOrganizerError;
  }
};

// Kollar CreateAccount så att det fyller kraven och sätter meddelande

export const validateInputsCreateAccount = (userinputs) => {
  const firstNameError = validateName(userinputs.firstname, 50);
  const lastNameError = validateName(userinputs.lastname, 50);
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
  if (firstNameError != "") {
    return firstNameError;
  }
  if (lastNameError != "") {
    return lastNameError;
  }
  if (emailError != "") {
    return emailError;
  }
  if (passwordError != "") {
    return passwordError;
  }
};
