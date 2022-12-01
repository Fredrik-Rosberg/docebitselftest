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

export const createCourses = async (coursesArray) => {
  let courses = [];
  coursesArray.map((course) =>
    courses.push({
      userid: course.user.id,
      courseoccasionid: course.occasion.id,
      testid: course.test.id,
    })
  );

  let dataResponse = await fetch(`/api/user/:${data.id}`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(courses),
  });
  let data = await dataResponse.json();
  console.log(data);
  if (dataResponse.ok) {
    return data;
  } else {
    return data;
  }
};

export const deleteCourseOccasion = async (data) => {
  let dataResponse = await fetch(`/api/courseoccasion/:${data.id}`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  dataResponse = await dataResponse.json();
  console.log(dataResponse);

  if (dataResponse.ok) {
    return dataResponse.message;
  } else {
    return dataResponse.error;
  }
};

export const deleteAccount = async (data) => {
  let dataResponse = await fetch(`/api/user/:${data.id}`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  dataResponse = await dataResponse.json();
  console.log(dataResponse);

  if (dataResponse.ok) {
    return dataResponse.message;
  } else {
    return dataResponse.error;
  }
};
export const deleteTest = async (data) => {
  let dataResponse = await fetch(`/api/user/:${data.id}`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  dataResponse = await dataResponse.json();
  console.log(dataResponse);
  if (dataResponse.ok) {
    return dataResponse.message;
  } else {
    return dataResponse.error;
  }
};
export const deleteCourse = async (data) => {
  data = data[0];

  let dataResponse = await fetch(`/api/course/${data.id}`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  dataResponse = await dataResponse.json();
  console.log(dataResponse);
  if (dataResponse.ok) {
    return dataResponse.message;
  } else {
    return dataResponse.error;
  }
};
