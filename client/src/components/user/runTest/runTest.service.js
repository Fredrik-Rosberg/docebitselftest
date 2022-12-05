export const getQuestionsById = async (testId) => {
  try {
    let dataResponse = await fetch(`/api/test/questions/${testId}` );
    if (dataResponse.ok) {
      let questions = await dataResponse.json();
      return questions;
    }
  } catch (error) {
    console.error(error);
  }
};
