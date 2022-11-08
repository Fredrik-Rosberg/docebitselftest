const url = "/api/reset/";


export const sendMail = async (mail) => {
  try {
    let dataResponse = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mail),
    });
    let response = await dataResponse.json();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
export const updatePassword = async (resetids) => {
  try {
    let dataResponse = await fetch(url, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resetids),
    });

    let response = await dataResponse.json();
    console.log("hej");
  } catch (error) {
    console.log(error);
  }
};

export const getExpireDate = async (resetid) => {
  let dataResponse = await fetch(url + resetid);
  let response = await dataResponse.json();
  if (response.sessionExpired) {
    return true;
  } else return false;
};

export const destroyResetId = async (resetid) => {
  let dataResponse = await fetch(url + resetid);

  let response = await dataResponse.json();
  console.log(response);
  if (response.sessionExpired) {
    return true;
  } else return false;
};
