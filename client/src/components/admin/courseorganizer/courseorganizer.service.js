export const uploadImage = async (image, info) => {
const data = new FormData();
data.append('image', image)
data.append('name', info.name)
console.log(info.name)
// data.append('city', info.city)

console.log(data)
let response = await fetch("/api/course/organizer", {
    method: "post",
    body: data,
  });
  await response.json();

  // if (response.ok) {
  //   return {message: result.message, status:"Lyckad inläsning"};
  // } else {
  //   return { error: result.error };
  // }
}