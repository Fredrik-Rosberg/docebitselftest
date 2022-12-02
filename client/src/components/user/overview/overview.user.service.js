export const getCourseByUserId = async (id) => {
  const dataResponse = await fetch(`/api/course/user/${id}`);
  let data = await dataResponse.json();
  if (dataResponse.ok) {
    console.log(data)
    return data;
  } else {
    return null;
  }
};
