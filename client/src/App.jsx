// import { useState } from "react";
// // import { fetchStructuredContent } from "./api/learnApi";
// import mockData from "./data/mockData";

// import SummaryCard from "./components/SummaryCard";
// import NotesSection from "./components/NotesSection";
// import FlashcardsSection from "./components/FlashcardsSection";
// import QuizSection from "./components/QuizSection";
// import AITutor from './components/AITutor';

// function App() {
//   const [url, setUrl] = useState("");
//   const [learningData, setLearningData] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleGenerate() {
//     setError("");
//     setLearningData(null);

//     if (!url.trim()) {
//       setError("Please paste a YouTube URL.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // const data = await fetchStructuredContent(url.trim());
//       // setLearningData(data);
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       setLearningData(mockData);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-[#F8F8F5] text-[#111827]">

//       {/* Background */}
//       <div className="fixed inset-0 -z-10 overflow-hidden">
//         <div className="absolute -top-64 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-neutral-200/40 blur-[180px]" />
//       </div>

//       {/* Hero */}
//       <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">

//         <div className="text-center">

//           <span className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-medium shadow-sm">
//             LearnTube AI
//           </span>

//           <h1 className="mt-8 text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.06em] leading-none">
//             Learn Smarter.
//             <br />
//             Not Longer.
//           </h1>

//           <p className="mt-8 max-w-3xl mx-auto text-xl leading-9 text-neutral-500">
//             Transform any YouTube tutorial into beautifully structured
//             summaries, notes, flashcards and quizzes in seconds.
//           </p>

//         </div>

//         {/* Input */}

//         <div className="mt-20">

//           <div className="rounded-[36px] bg-white border border-neutral-200 shadow-[0_30px_80px_rgba(0,0,0,.06)] p-4">

//             <div className="flex flex-col lg:flex-row gap-4">

//               <input
//                 value={url}
//                 onChange={(e) => setUrl(e.target.value)}
//                 placeholder="Paste any YouTube URL..."
//                 className="w-full lg:flex-1 h-16 rounded-2xl bg-neutral-100 px-6 text-lg outline-none focus:ring-2 focus:ring-black/10"
//               />

//               <button
//                 onClick={handleGenerate}
//                 disabled={loading}
//                 className="w-full lg:w-auto h-16 rounded-2xl bg-black px-10 text-lg font-semibold text-white transition-all hover:scale-[1.02] hover:bg-neutral-900 disabled:opacity-50"
//               >
//                 {loading ? "Generating" : "Generate Learning Kit"}
//               </button>

//             </div>

//           </div>

//         </div>

//         {/* Features */}

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-44">

//           {[
//             ["Summary", "Concise AI overview"],
//             ["Notes", "Organized study notes"],
//             ["Flashcards", "Interactive revision"],
//             ["Quiz", "Test your knowledge"],
//           ].map(([title, desc]) => (
//             <div
//               key={title}
//               className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
//             >
//               <div className="text-xs uppercase tracking-[0.2em] text-neutral-400">
//                 AI
//               </div>

//               <h3 className="mt-5 text-2xl font-bold">
//                 {title}
//               </h3>

//               <p className="mt-3 text-neutral-500 leading-7">
//                 {desc}
//               </p>
//             </div>
//           ))}

//         </div>

//       </section>

//       {/* Error */}

//       {error && (
//         <div className="max-w-4xl mx-auto px-6">
//           <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-600">
//             {error}
//           </div>
//         </div>
//       )}

//       {/* Loading */}

//       {loading && (
//         <section className="max-w-5xl mx-auto px-6 py-24">

//           <div className="rounded-[40px] border border-neutral-200 bg-white p-20 shadow-[0_30px_80px_rgba(0,0,0,.05)] text-center">

//             <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-neutral-200 border-t-black" />

//             <h2 className="mt-8 text-4xl font-bold">
//               Generating your learning kit
//             </h2>

//             <p className="mt-4 text-lg text-neutral-500">
//               Reading transcript, understanding concepts and preparing your study material...
//             </p>

//           </div>

//         </section>
//       )}

//       {/* Empty State */}

//       {!learningData && !loading && (
//         <section className="max-w-4xl mx-auto px-6 pb-28">

//           <div className="rounded-[40px] border border-dashed border-neutral-300 bg-white/70 p-20 text-center">

//             <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-9 w-9 text-neutral-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeWidth={1.8}
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 6h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
//                 />
//               </svg>
//             </div>

//             <h2 className="mt-8 text-4xl font-bold">
//               Your learning kit will appear here
//             </h2>

//             <p className="mt-4 text-lg text-neutral-500">
//               Paste any YouTube tutorial above and let LearnTube build
//               a complete study experience for you.
//             </p>

//           </div>

//         </section>
//       )}

//       {/* Results */}

//       {learningData && (
//         <section className="max-w-6xl mx-auto px-6 pb-24 space-y-10">

//           <SummaryCard summary={learningData.summary} />

//           <NotesSection notes={learningData.notes} />

//           <FlashcardsSection flashcards={learningData.flashcards} />

//           <QuizSection quiz={learningData.quiz} />

//           <AITutor learningData={learningData} />

//         </section>
//       )}

//     </div>
//   );
// }

// export default App;

import { useState, useRef } from "react";
import { fetchStructuredContent } from "./api/learnApi";
// import mockData from "./data/mockData";
import { downloadLearningKit } from "./utils/downloadPdf";

import SummaryCard from "./components/SummaryCard";
import NotesSection from "./components/NotesSection";
import FlashcardsSection from "./components/FlashcardsSection";
import QuizSection from "./components/QuizSection";
import AITutor from "./components/AITutor";

function App() {
  const [url, setUrl] = useState("");
  const [learningData, setLearningData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resultsRef = useRef(null);

  async function handleGenerate() {
    setError("");
    setLearningData(null);

    if (!url.trim()) {
      setError("Please paste a YouTube URL.");
      return;
    }

    setLoading(true);

    // Smoothly scroll to loading/results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);

    try {
      const data = await fetchStructuredContent(url.trim());
      setLearningData(data);

      // await new Promise((resolve) => setTimeout(resolve, 500));

      // setLearningData(mockData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F8F5] text-[#111827]">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-64 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-neutral-200/40 blur-[180px]" />
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-medium shadow-sm">
            LearnTube AI
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.06em] leading-none">
            Learn Smarter.
            <br />
            Not Longer.
          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-xl leading-9 text-neutral-500">
            Transform any YouTube tutorial into beautifully structured
            summaries, notes, flashcards and quizzes in seconds.
          </p>
        </div>

        {/* Input */}

        <div className="mt-32 md:mt-20">
          <div className="rounded-[36px] bg-white border border-neutral-200 shadow-[0_30px_80px_rgba(0,0,0,.06)] p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste any YouTube URL"
                className="w-full lg:flex-1 h-16 rounded-2xl bg-neutral-100 px-6 text-lg outline-none focus:ring-2 focus:ring-black/10"
              />

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full lg:w-auto h-16 rounded-2xl bg-black px-10 text-lg font-semibold text-white transition-all hover:scale-[1.02] hover:bg-neutral-900 disabled:opacity-50"
              >
                {loading ? "Generating" : "Generate Learning Kit"}
              </button>
            </div>
          </div>
        </div>

        {/* Features */}

        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-44"> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-44 mb-6">
          {[
            ["Summary", "Concise AI overview"],
            ["Notes", "Organized study notes"],
            ["Flashcards", "Interactive revision"],
            ["Quiz", "Test your knowledge"],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                AI
              </div>

              <h3 className="mt-5 text-2xl font-bold">{title}</h3>

              <p className="mt-3 text-neutral-500 leading-7">{desc}</p>
            </div>
          ))}
        </div>
        {/* </div> */}
      </section>

      {/* Error */}

      {error && (
        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-600">
            {error}
          </div>
        </div>
      )}

      {/* Everything below is the scroll target */}
      <div ref={resultsRef}>
        {/* Loading */}

        {loading && (
          <section className="max-w-5xl mx-auto px-6 py-24">
            <div className="rounded-[40px] border border-neutral-200 bg-white p-20 shadow-[0_30px_80px_rgba(0,0,0,.05)] text-center">
              <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-neutral-200 border-t-black" />

              <h2 className="mt-8 text-4xl font-bold">
                Generating your learning kit
              </h2>

              <p className="mt-4 text-lg text-neutral-500">
                Reading transcript, understanding concepts and preparing your
                study material
              </p>
            </div>
          </section>
        )}

        {/* Empty State */}

        {!learningData && !loading && (
          <section className="max-w-4xl mx-auto px-6 pb-28 pt-6">
            <div className="rounded-[40px] border border-dashed border-neutral-300 bg-white/70 p-10 sm:p-14 md:p-20 text-center">
              <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-neutral-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9 text-neutral-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 6h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
                  />
                </svg>
              </div>

              <h2 className="mt-8 text-2xl sm:text-3xl md:text-4xl font-bold">
                Your learning kit will appear here
              </h2>

              <p className="mt-4 text-base sm:text-lg text-neutral-500 leading-7">
                Paste any YouTube tutorial above and let LearnTube build a
                complete study experience for you.
              </p>
            </div>
          </section>
        )}

        {/* Results */}

        {learningData && (
          <section className="max-w-6xl mx-auto px-6 pb-24 space-y-10">
            <div className="flex justify-end mb-8">
              <button
                onClick={() => downloadLearningKit(learningData)}
                className="rounded-2xl bg-black px-6 py-3 font-medium text-white transition hover:bg-neutral-800"
              >
                Download Learning Kit
              </button>
            </div>

            <SummaryCard summary={learningData.summary} />

            <NotesSection notes={learningData.notes} />

            <FlashcardsSection flashcards={learningData.flashcards} />

            <QuizSection quiz={learningData.quiz} />

            <AITutor learningData={learningData} />
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
