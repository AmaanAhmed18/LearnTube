const { generateCompletion } = require('./aiProviders/geminiProvider');
const { extractJson } = require('../utils/extractJson');

const SYSTEM_PROMPT = `You are an AI tutor helping a learner who just studied a YouTube video.

Rules:
1. If the learner's question relates to the video, answer primarily using the provided learning content (summary, notes, flashcards, quiz).
2. If the question isn't covered by that content, answer using your own general knowledge.
3. If both are useful, combine them naturally into one clear answer.
4. When you use information beyond the video's content, clearly say so (e.g. "Beyond what's covered in the video, ...").
5. Be concise, clear, and encouraging — like a patient, knowledgeable tutor.

Return ONLY a valid JSON object, no markdown, no commentary, matching exactly:
{ "answer": "string" }`;

function formatHistory(history) {
  if (!Array.isArray(history) || history.length === 0) return 'None yet.';
  return history
    .map((turn) => `${turn.role === 'user' ? 'Learner' : 'Tutor'}: ${turn.content}`)
    .join('\n');
}

function formatLearningData(learningData) {
  if (!learningData) return 'None provided.';
  const { summary, notes, flashcards, quiz } = learningData;
  const parts = [];

  if (summary) parts.push(`Summary: ${summary}`);
  if (Array.isArray(notes) && notes.length) {
    parts.push(`Notes:\n${notes.map((n) => `- ${n.title}: ${n.content}`).join('\n')}`);
  }
  if (Array.isArray(flashcards) && flashcards.length) {
    parts.push(`Flashcards:\n${flashcards.map((f) => `- Q: ${f.question} A: ${f.answer}`).join('\n')}`);
  }
  if (Array.isArray(quiz) && quiz.length) {
    parts.push(`Quiz topics:\n${quiz.map((q) => `- ${q.question}`).join('\n')}`);
  }

  return parts.join('\n\n') || 'None provided.';
}

function formatTranscript(transcript) {
  if (!transcript) return 'None provided.';
  if (Array.isArray(transcript)) return transcript.map((segment) => segment.text).join(' ');
  return String(transcript);
}

function buildUserPrompt({ question, transcript, learningData, history }) {
  return `Video transcript:\n${formatTranscript(transcript)}\n\nGenerated learning content:\n${formatLearningData(learningData)}\n\nConversation so far:\n${formatHistory(history)}\n\nLearner's new question: ${question}`;
}

function validateChatResponse(data) {
  return Boolean(data) && typeof data.answer === 'string' && data.answer.trim().length > 0;
}

/**
 * Gets a tutor answer for a learner's question, grounded in the video's
 * learning content (and transcript, if available) plus prior conversation.
 */
async function getTutorAnswer({ question, transcript, learningData, history }) {
  const userPrompt = buildUserPrompt({ question, transcript, learningData, history });
  const rawResponse = await generateCompletion(SYSTEM_PROMPT, userPrompt);
  const parsed = extractJson(rawResponse);

  if (!validateChatResponse(parsed)) {
    throw new Error('AI_INVALID_SCHEMA');
  }

  return parsed.answer;
}

module.exports = { getTutorAnswer };