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





// Sätter meddelande för både email och password beroende på om användarens input följer kravspecen. Returnerar respektive meddelande.

export const validateUserInputs = (userInput) => {
  const emailError = validateEmail(userInput.email);
  const passwordError = validatePassword(userInput.password);

  if (emailError === "" && passwordError === "" || userInput.firstName && userInput.lastName ) {
    return "";
  } else {
    return "Kontrollera att du angivit rätt E-post och lösenord";
  }
};

// Kontrollerar att användarens input bara består av bokstäver

export const validateUserInputOnlyLetters = (input) => {
  if (!input) {
    return "Vänligen fyll i samtliga uppgifter för att skapa kurstillfälle";
  } else if (!new RegExp(/^[A-Öa-ö]+$/).test(input) || input.length > 100) {
    return "Får endast innehålla bokstäver och vara max 100 tecken långt";
  }

  return "";
};
