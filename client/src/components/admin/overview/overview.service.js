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
    return data.message;
  }
};
