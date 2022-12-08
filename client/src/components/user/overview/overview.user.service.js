export const getCourseByUserId = async (id) => {
  const dataResponse = await fetch(`/api/course/user/${id}`);
  let data = await dataResponse.json();
  if (dataResponse.ok) {
    return data;
  } else {
    return null;
  }
};


export const createResult = async (result) => {
  try {
    let dataResponse = await fetch(`/api/course/result`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    });
    console.log(dataResponse);
    let response = await dataResponse.json();
    return response.message;
  } catch (error) {
    console.log(error);
  }
};

export const getResultsByCourseId = async (id) => {
  const dataResponse = await fetch(`/api/course/result/${id}`);
  let data = await dataResponse.json();
  if (dataResponse.ok) {
    return data;
  } else {
    return null;
  }
};

export const getUserById = async (id) => {
  try {
    let response = await fetch(`api/user/${id}`);
    let data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};