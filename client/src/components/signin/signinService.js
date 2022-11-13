const url = "/api/signin";

export const signIn = async (data) => {
  try {
    let dataResponse = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let response = await dataResponse.json();

    if (response.loggedIn) {
      localStorage.setItem("userId", response.userId);
      return response;
    } else {
      console.log(response);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};
 export const signOut =async ()=>{
  try {
     let dataResponse= await fetch(url, {method:"delete"})
     let response=await dataResponse.json();
     return(response)
  } catch (error) {
    return error
  }
   



 }