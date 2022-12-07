export const getCourseByUserId = async (id) => {
  const dataResponse = await fetch(`/api/course/user/${id}`);
  let data = await dataResponse.json();
  if (dataResponse.ok) {
    return data;
  } else {
    return null;
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