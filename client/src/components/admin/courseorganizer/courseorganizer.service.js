export const uploadImage = async (image, info) => {
  const data = new FormData();
  data.append("image", image);
  data.append("name", info.name);
  data.append("city", info.city);
  let response = await fetch("/api/organizer", {
    method: "post",
    body: data,
  });
  let result = await response.json();
  if (response.ok) {
    return { message: result.message, status: "Lyckad inläsning" };
  } else {
    return { error: result.error };
  }
};
