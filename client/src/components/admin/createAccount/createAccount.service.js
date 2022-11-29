//skapa konto

const url = "/api/user";

export const createAccount = async (data) => {
  try {
    let dataResponse = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let response = await dataResponse.json();

    return response;
  } catch (error) {
    console.error(error);
  }
};

//ta bort konto

//ändra konto
