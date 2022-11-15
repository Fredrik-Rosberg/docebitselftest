export const changePassword = async (newpassword, id) => {
 let newpasswordinfo={password:newpassword, id: id}
  try {
    let dataResponse = await fetch(
      "/api/user/" + id + "/changePassword",
      {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newpasswordinfo),
      }
    );
    
      let result = await dataResponse.json();
      console.log(dataResponse);
      return result;
    
  } catch (error) {
    console.error(error);
  }
};

export const checkCurrentPassword = async (currentpassword, id) => {
  let currentInfo = { currentpassword: currentpassword, id: id };
  try {
    let dataResponse = await fetch("/api/user/" + id + "/changepassword", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentInfo),
    });

    let checkPassword = await dataResponse.json();

    return checkPassword.result;

  } catch (error) {
    return "hej";
  }
};
