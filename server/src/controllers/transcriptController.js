const { isValidYouTubeUrl, extractVideoId } = require('../utils/youtube');
const { getTranscript } = require('../services/transcriptService');

const ERROR_MESSAGES = {
  CAPTIONS_DISABLED: 'Captions are disabled for this video.',
  VIDEO_PRIVATE: 'This video is private or unavailable.',
  TRANSCRIPT_UNAVAILABLE: 'No transcript is available for this video.',
  TRANSCRIPT_FETCH_FAILED: 'Failed to retrieve the transcript. Please try again.',
};

async function handleTranscriptRequest(req, res) {
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

  try {
    const transcript = await getTranscript(videoId);
    return res.status(200).json({ videoId, transcript });
  } catch (error) {
    const message = ERROR_MESSAGES[error.message] || ERROR_MESSAGES.TRANSCRIPT_FETCH_FAILED;
    return res.status(422).json({ error: message });
  }
}

module.exports = { handleTranscriptRequest };
