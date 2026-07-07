// const API_BASE_URL = 'http://localhost:5001/api';

// /**
//  * Sends a question, plus learning context and conversation history,
//  * to the AI tutor endpoint and returns the tutor's answer.
//  */
// export async function askTutor({ question, learningData, history }) {
//   const response = await fetch(`${API_BASE_URL}/chat`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ question, learningData, history }),
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.error || 'Something went wrong.');
//   }

//   return data.answer;
// }


const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001";

/**
 * Sends a question, plus learning context and conversation history,
 * to the AI tutor endpoint and returns the tutor's answer.
 */
export async function askTutor({ question, learningData, history }) {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
      learningData,
      history,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong.");
  }

  return data.answer;
}