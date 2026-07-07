const { getTutorAnswer } = require('../services/chatService');

const ERROR_MESSAGES = {
  AI_RESPONSE_NOT_JSON: 'The AI returned an invalid response. Please try again.',
  AI_EMPTY_RESPONSE: 'The AI returned an empty response. Please try again.',
  AI_INVALID_SCHEMA: 'The AI response did not match the expected format. Please try again.',
  AI_GENERATION_FAILED: 'Please try again in a minute. Our AI is currently busy.',
};

function resolveErrorMessage(error) {
  const key = error.message.split(':')[0].trim();
  return ERROR_MESSAGES[key] || ERROR_MESSAGES.AI_GENERATION_FAILED;
}

async function handleChatRequest(req, res) {
  const { question, transcript, learningData, history } = req.body;

  if (!question || typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({ error: 'A question is required.' });
  }

  try {
    const answer = await getTutorAnswer({ question, transcript, learningData, history });
    return res.status(200).json({ answer });
  } catch (error) {
    console.error('AI tutor error:', error.message);
    return res.status(502).json({ error: resolveErrorMessage(error) });
  }
}

module.exports = { handleChatRequest };