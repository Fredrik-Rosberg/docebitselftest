export const uploadCsv = async (data) => {
  let response = await fetch("/api/test", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  let result = await response.json();

  if (response.ok) {
    return {message: result.message, status:"Lyckad inläsning"};
  } else {
    return { error: result.error };
  }
};
