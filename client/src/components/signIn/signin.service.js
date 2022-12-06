const url = "/api/signin";
const getUserById = async (id) => {
  try {
    let response = await fetch(`api/user/${id}`);
    let data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const signIn = async (data) => {
  try {
    let dataResponse = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let response = await dataResponse.json();

    if (response.loggedIn) {
      localStorage.setItem("user", response.userId);
      let username = await getUserById(response.userId);
      localStorage.setItem(
        "username",
        `${username.firstname} ${username.lastname}`
      );
      return response;
    } else {
      console.log(response);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
export const signOut = async () => {
  try {
    let dataResponse = await fetch(url, { method: "delete" });
    let response = await dataResponse.json();
    return response;
  } catch (error) {
    return error;
  }
};
