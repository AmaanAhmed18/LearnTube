const YOUTUBE_HOSTS = ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'];

/**
 * Checks whether a given string is a URL belonging to YouTube.
 */
function isValidYouTubeUrl(url) {
  try {
    const parsed = new URL(url);
    return YOUTUBE_HOSTS.includes(parsed.hostname);
  } catch {
    return false;
  }
}

/**
 * Extracts the 11-character video ID from common YouTube URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 */
function extractVideoId(url) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.slice(1) || null;
    }

    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname === '/watch') {
        return parsed.searchParams.get('v');
      }
      if (parsed.pathname.startsWith('/embed/')) {
        return parsed.pathname.split('/embed/')[1];
      }
      if (parsed.pathname.startsWith('/shorts/')) {
        return parsed.pathname.split('/shorts/')[1];
      }
    }

    return null;
  } catch {
    return null;
  }
}

module.exports = { isValidYouTubeUrl, extractVideoId };
