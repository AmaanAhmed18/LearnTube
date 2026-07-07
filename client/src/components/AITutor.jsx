import { useState, useRef, useEffect } from 'react';
import { askTutor } from '../api/chatApi';

function AITutor({ learningData }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  async function handleSend() {
    const question = input.trim();
    if (!question || isLoading) return;

    setError('');
    const priorHistory = messages;
    setMessages((prev) => [...prev, { role: 'user', content: question }]);
    setInput('');
    setIsLoading(true);

    try {
      const answer = await askTutor({ question, learningData, history: priorHistory });
      setMessages((prev) => [...prev, { role: 'tutor', content: answer }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight mb-1">
        Still have questions?
      </h2>
      <p className="text-sm text-gray-400 mb-6">Ask the AI Tutor</p>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
        <div ref={scrollRef} className="px-6 py-6 sm:px-8 sm:py-8 space-y-4 max-h-96 overflow-y-auto">
          {messages.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-8">
              Ask anything about this video, or beyond it.
            </p>
          )}

          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 text-sm sm:text-base leading-relaxed whitespace-pre-line ${
                  message.role === 'user'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-50 text-gray-700 border border-gray-100'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          )}
        </div>

        {error && <p className="px-6 sm:px-8 pb-2 text-sm text-red-600">{error}</p>}

        <div className="border-t border-gray-100 px-4 py-4 sm:px-6 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question..."
            disabled={isLoading}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 disabled:opacity-60"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-5 py-3 rounded-xl text-sm font-medium text-white bg-gray-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default AITutor;