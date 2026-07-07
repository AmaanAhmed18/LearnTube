const API_BASE_URL = 'http://localhost:5001/api';

/**
 * Sends a YouTube URL to the backend and returns structured learning data:
 * { summary, notes, timeline, flashcards, quiz }.
 * The frontend has no knowledge of transcripts — that's fully handled
 * server-side by the transcript + AI pipeline.
 */
export async function fetchStructuredContent(url) {
  const response = await fetch(`${API_BASE_URL}/learn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong.');
  }

  return data;
}
