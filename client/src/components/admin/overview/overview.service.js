export const getCourses = async () => {
  let response = await fetch("/api/course");
  let data = await response.json();
  if (response.ok) {
    return data;
  } else {
    return data;
  }
};

export const getUsers = async () => {
  let response = await fetch("/api/user");
  let data = await response.json();
  if (response.ok) {
    return data;
  } else {
    return data;
  }
};
export const getTests = async () => {
  let response = await fetch("/api/test");
  let data = await response.json();
  if (response.ok) {
    return data;
  } else {
    return data;
  }
};
export const getCourseOccasions = async () => {
  let response = await fetch("/api/courseoccasion");
  let data = await response.json();
  if (response.ok) {
    return data;
  } else {
    return data;
  }
};

export const deleteCourseOccasion = async (data) => {
  return await deleteFetch(`/api/courseoccasion/${data.id}`, data);
};

export const deleteAccount = async (data) => {
  return await deleteFetch(`/api/user/${data.id}`, data);
};

export const deleteTest = async (data) => {
  return await deleteFetch(`/api/test/${data.id}`, data);
};

export const deleteCourse = async (data) => {
  data = data[0];
  return await deleteFetch(`/api/course/${data.id}`, data);
};

const deleteFetch = async (url, data) => {
  let dataResponse = await fetch(url, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  let result = await dataResponse.json();

  if (dataResponse.ok) {
    console.log(result);
    return result;
  } else {
    return null;
  }
};
