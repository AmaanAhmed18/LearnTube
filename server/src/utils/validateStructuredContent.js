function isString(value) {
  return typeof value === 'string';
}

function isArray(value) {
  return Array.isArray(value);
}

function validateNotes(notes) {
  return isArray(notes) && notes.every((n) => isString(n?.title) && isString(n?.content));
}

function validateTimeline(timeline) {
  return (
    isArray(timeline) &&
    timeline.every((t) => isString(t?.timestamp) && isString(t?.title) && isString(t?.description))
  );
}

function validateFlashcards(flashcards) {
  return isArray(flashcards) && flashcards.every((f) => isString(f?.question) && isString(f?.answer));
}

function validateQuiz(quiz) {
  return (
    isArray(quiz) &&
    quiz.every(
      (q) =>
        isString(q?.question) &&
        isArray(q?.options) &&
        q.options.every(isString) &&
        isString(q?.correctAnswer) &&
        q.options.includes(q.correctAnswer)
    )
  );
}

/**
 * Validates that AI output matches the required schema:
 * { summary, notes[], timeline[], flashcards[], quiz[] }
 * Returns { valid: true } or { valid: false, reason: string }.
 */
function validateStructuredContent(data) {
  if (!data || typeof data !== 'object') {
    return { valid: false, reason: 'Response is not an object.' };
  }
  if (!isString(data.summary)) {
    return { valid: false, reason: 'Missing or invalid "summary".' };
  }
  if (!validateNotes(data.notes)) {
    return { valid: false, reason: 'Missing or invalid "notes".' };
  }
  if (!validateTimeline(data.timeline)) {
    return { valid: false, reason: 'Missing or invalid "timeline".' };
  }
  if (!validateFlashcards(data.flashcards)) {
    return { valid: false, reason: 'Missing or invalid "flashcards".' };
  }
  if (!validateQuiz(data.quiz)) {
    return { valid: false, reason: 'Missing or invalid "quiz".' };
  }

  return { valid: true };
}

module.exports = { validateStructuredContent };


