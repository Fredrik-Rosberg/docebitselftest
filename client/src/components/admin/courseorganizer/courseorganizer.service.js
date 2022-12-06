export const uploadImage = async (image, data) => {
const data = new FormData();
data.append('image', image)
data.append('data', data)
console.log(data)
let response = await fetch("/api/course/organizer", {
    method: "post",
    body: data,
  });
  let result = await response.json();

  if (response.ok) {
    return {message: result.message, status:"Lyckad inläsning"};
  } else {
    return { error: result.error };
  }
}