const { isValidYouTubeUrl, extractVideoId } = require('../utils/youtube');
const { getTranscript } = require('../services/transcriptService');
const { generateStructuredContent } = require('../services/aiService');

const ERROR_MESSAGES = {
  CAPTIONS_DISABLED: 'We could not retrieve a transcript for this video.',
  VIDEO_PRIVATE: 'This video is private or unavailable.',
  TRANSCRIPT_UNAVAILABLE: 'No transcript is available for this video.',
  TRANSCRIPT_FETCH_FAILED: 'Failed to retrieve the transcript. Please try again.',
  AI_RESPONSE_NOT_JSON: 'The AI returned an invalid response. Please try again.',
  AI_EMPTY_RESPONSE: 'The AI returned an empty response. Please try again.',
  AI_INVALID_SCHEMA: 'The AI response did not match the expected format. Please try again.',
  AI_GENERATION_FAILED: 'Failed to generate learning content. Please try again.',
};

function resolveErrorMessage(error) {
  const key = error.message.split(':')[0].trim();
  return ERROR_MESSAGES[key] || ERROR_MESSAGES.AI_GENERATION_FAILED;
}

/**
 * Orchestrates the full pipeline: URL -> transcript -> AI -> structured JSON.
 * The frontend only ever sees the final structured JSON, never the transcript.
 */
async function handleLearnRequest(req, res) {
  const { url } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'A YouTube URL is required.' });
  }

  if (!isValidYouTubeUrl(url)) {
    return res.status(400).json({ error: 'The URL provided is not a valid YouTube URL.' });
  }

  const videoId = extractVideoId(url);

  if (!videoId) {
    return res.status(400).json({ error: 'Could not extract a video ID from the URL.' });
  }

  let transcript;
  try {
    transcript = await getTranscript(videoId);
  } catch (error) {
    return res.status(422).json({ error: resolveErrorMessage(error) });
  }

  try {
    const structuredContent = await generateStructuredContent(transcript);
    return res.status(200).json(structuredContent);
  } catch (error) {
    console.error('AI generation error:', error.message);
    return res.status(502).json({ error: resolveErrorMessage(error) });
  }
}

module.exports = { handleLearnRequest };
