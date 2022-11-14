//skapa konto

const url = "/api/user/";

export const editAccount = async (data) => {
  try {
    const user = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      role: data.role,
    };
    console.log(user)
    let dataResponse = await fetch(url + data.id, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    let response = await dataResponse.json();
    console.log(response);
    return response.message;
  } catch (error) {
    console.error(error);
    return "Något gick fel"
  }
};

//ta bort konto

//ändra konto
