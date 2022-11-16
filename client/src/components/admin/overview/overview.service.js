export const getCourses = async () => {
  let response = await fetch("/api/course");
  let data = await response.json();
  if (response.ok) {
    return data;
  } else {
    return data.message;
  }
};

export const getUsers = async () => {
  let response = await fetch("/api/user");
  let data = await response.json();
  if (response.ok) {
    return data;
  } else {
    return data.message;
  }
};
export const getTests = async () => {
  let response = await fetch("/api/test");
  let data = await response.json();
  if (response.ok) {
    return data;
  } else {
    return data.message;
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

export const createCourse = async () => {
  let dataResponse = await fetch("/api/course", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  let data = await dataResponse.json();
  if (dataResponse.ok) {
    return data.message;
  } else {
    return data.message;
  }
};
