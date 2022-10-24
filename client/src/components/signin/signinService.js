const url = "/api/signin";

export const signIn = async (data) => {
  try {
    let dataResponse = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let response = await dataResponse.json();
    console.log(response);
    if (response.loggedIn) {
      return response.message;
    } else {
      console.log(response.message);
      return response.message;
    }
  } catch (error) {
    console.log(error);
  }
};
