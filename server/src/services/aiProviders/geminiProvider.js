const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL = process.env.GEMINI_MODEL || 'gemini-flash-latest';

/**
 * Sends a system + user prompt to Gemini and returns raw text.
 * This is the ONLY function the rest of the app depends on.
 * Swapping providers later means writing a new file with this
 * same function signature and updating one import in aiService.js.
 */
async function generateCompletion(systemPrompt, userPrompt) {
  const model = genAI.getGenerativeModel({
    model: MODEL,
    systemInstruction: systemPrompt,
    generationConfig: {
      // Forces Gemini to return raw JSON, no markdown fences.
      responseMimeType: 'application/json',
    },
  });

  const result = await model.generateContent(userPrompt);
  const text = result.response.text();

  if (!text) {
    throw new Error('AI_EMPTY_RESPONSE');
  }

  return text;
}

module.exports = { generateCompletion };
