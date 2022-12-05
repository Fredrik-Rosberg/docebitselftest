export const getTestByUserId = async (userid) => {
  let response = await fetch(`/api/test/${userid}`);
  let data = await response.json();
  if (response.ok) {
    return data;
  } else {
    return data;
  }
};
