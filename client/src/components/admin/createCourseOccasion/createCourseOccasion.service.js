const url = "/api/courseoccasion";

export const createCourseOccasion = async (course) => {
  try {
    let dataResponse = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    });
    let response = await dataResponse.json();
    return response.message;
  } catch (error) {
    console.log(error);
  }
};

export const getCourseOrganizers = async () => {
  try {
    let dataResponse = await fetch("/api/course/organizer");
    let response = await dataResponse.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};
