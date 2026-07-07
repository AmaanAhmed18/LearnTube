const { generateCompletion } = require('./aiProviders/geminiProvider');
const { extractJson } = require('../utils/extractJson');
const { validateStructuredContent } = require('../utils/validateStructuredContent');


const SYSTEM_PROMPT = `You are an expert educator. Your task is to transform a raw video transcript into structured study material that is factually based on the transcript, easy to understand, well organized, and suitable for revision. Do not invent information that isn't supported by the transcript.

You must return ONLY a valid JSON object — no markdown, no code blocks, no commentary, no text before or after it. It must match exactly this shape:

{
  "summary": "string",
  "notes": [{ "title": "string", "content": "string" }],
  "timeline": [{ "timestamp": "string", "title": "string", "description": "string" }],
  "flashcards": [{ "question": "string", "answer": "string" }],
  "quiz": [{ "question": "string", "options": ["string", "string", "string", "string"], "correctAnswer": "string" }]
}

Rules:
- "timestamp" values in the timeline must use "M:SS" format and come from the actual transcript timestamps provided.
- Produce 3-6 notes, 4-8 timeline entries spread across the video, 5-10 flashcards, and 3-5 quiz questions.
- Each quiz question must have exactly 4 options, and "correctAnswer" must exactly match one of them.
- Base everything strictly on the transcript content. Do not invent facts not present in the transcript.
- Return nothing but the JSON object.`;

/**
 * Converts transcript segments into a timestamped text block the LLM can
 * reference when generating the timeline.
 */
function formatTranscriptForPrompt(transcript) {
  return transcript
    .map((segment) => {
      const totalSeconds = Math.floor(segment.start);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const timestamp = `${minutes}:${String(seconds).padStart(2, '0')}`;
      return `[${timestamp}] ${segment.text}`;
    })
    .join('\n');
}

function buildUserPrompt(transcriptText) {
  return `Here is a video transcript with timestamps. Generate structured learning content from it.\n\n${transcriptText}`;
}

/**
 * Takes transcript segments and returns validated structured learning
 * content matching the fixed schema. Throws on malformed or invalid
 * AI output so the controller can respond with a clear error.
 */
async function generateStructuredContent(transcript) {
  const transcriptText = formatTranscriptForPrompt(transcript);
  const userPrompt = buildUserPrompt(transcriptText);

  const rawResponse = await generateCompletion(SYSTEM_PROMPT, userPrompt);
  const parsed = extractJson(rawResponse);

  const validation = validateStructuredContent(parsed);
  if (!validation.valid) {
    throw new Error(`AI_INVALID_SCHEMA: ${validation.reason}`);
  }

  return parsed;
}

module.exports = { generateStructuredContent };


