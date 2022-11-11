export const getCurrentUser = async (userId) => {
    try {
      let dataResponse = await fetch('/api/user/' +userId)
  if(dataResponse.ok)
  {
    let user = await dataResponse.json()
    return user
  }
    } catch (error) {
      console.error(error);
    }
  };