/**
 * Strips markdown code fences (if present) and parses the remaining
 * text as JSON. Throws a known error code if parsing fails.
 */
function extractJson(rawText) {
  const cleaned = rawText
    .trim()
    .replace(/^```json/i, '')
    .replace(/^```/, '')
    .replace(/```$/, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error('AI_RESPONSE_NOT_JSON');
  }
}

module.exports = { extractJson };
