const { YoutubeTranscript } = require('youtube-transcript');

/**
 * Fetches the transcript for a given YouTube video ID.
 * Normalizes errors into known error codes so the controller
 * can map them to user-friendly messages.
 */
async function getTranscript(videoId) {
  try {
    const segments = await YoutubeTranscript.fetchTranscript(videoId);

    return segments.map((segment) => ({
      text: segment.text,
      start: segment.offset,
      duration: segment.duration,
    }));
  } 
  //   catch (error) {
  //   const message = (error?.message || '').toLowerCase();

  //   if (message.includes('disabled')) {
  //     throw new Error('CAPTIONS_DISABLED');
  //   }
  //   if (message.includes('private')) {
  //     throw new Error('VIDEO_PRIVATE');
  //   }
  //   if (message.includes('unavailable') || message.includes('not available') || message.includes('no transcript')) {
  //     throw new Error('TRANSCRIPT_UNAVAILABLE');
  //   }

  //   throw new Error('TRANSCRIPT_FETCH_FAILED');
  // }
  catch (error) {
  console.error("========== ORIGINAL ERROR ==========");
  console.error(error);
  console.error(error.message);
  console.error(error.stack);

  const message = (error?.message || "").toLowerCase();

  if (message.includes("disabled")) {
    throw new Error("CAPTIONS_DISABLED");
  }

  if (message.includes("private")) {
    throw new Error("VIDEO_PRIVATE");
  }

  if (
    message.includes("unavailable") ||
    message.includes("not available") ||
    message.includes("no transcript")
  ) {
    throw new Error("TRANSCRIPT_UNAVAILABLE");
  }

  throw new Error("TRANSCRIPT_FETCH_FAILED");
}
}

module.exports = { getTranscript };
