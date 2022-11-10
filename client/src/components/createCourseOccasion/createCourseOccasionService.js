const url="/api/course/occasion"


export const createCourseOccasion = async (course) => {
  try {
    let dataResponse = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    });
    console.log(dataResponse)
    let response = await dataResponse.json();
    return response.message
  } catch (error) {
    console.log(error);
  }
};
