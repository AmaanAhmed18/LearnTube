import { useState } from "react";

function FlashcardsSection({ flashcards }) {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (!flashcards || flashcards.length === 0) return null;

  const card = flashcards[current];

  function nextCard() {
    if (current < flashcards.length - 1) {
      setCurrent((prev) => prev + 1);
      setFlipped(false);
    }
  }

  function prevCard() {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
      setFlipped(false);
    }
  }

  return (
    <section className="max-w-5xl mx-auto mt-12">

      <div className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_35px_80px_rgba(15,23,42,0.10)]">

        {/* Background */}

        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-stone-50" />

        <div className="absolute -top-40 -right-32 h-[340px] w-[340px] rounded-full bg-slate-200/40 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-[340px] w-[340px] rounded-full bg-stone-200/40 blur-3xl" />

        <div className="relative px-10 py-10 md:px-14 md:py-14">

          {/* Badge */}

          <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            Revision Cards
          </div>

          {/* Heading */}

          <h2 className="mt-7 text-4xl font-bold tracking-tight text-slate-900">
            Flashcards
          </h2>

          <p className="mt-3 text-lg leading-8 text-slate-500">
            Flip each card to reveal the answer.
          </p>

          {/* Progress */}

          <div className="mt-8 flex items-center justify-between">

            <p className="text-sm font-medium text-slate-500">
              Card {current + 1} of {flashcards.length}
            </p>

            <div className="h-2 w-52 overflow-hidden rounded-full bg-slate-200">

              <div
                className="h-full rounded-full bg-slate-900 transition-all duration-500"
                style={{
                  width: `${((current + 1) / flashcards.length) * 100}%`,
                }}
              />

            </div>

          </div>

          {/* Flashcard */}

          <div
            className="mt-10 flex justify-center"
            style={{ perspective: "1800px" }}
          >

            <div
              className="relative h-[340px] w-full max-w-3xl cursor-pointer"
              onClick={() => setFlipped(!flipped)}
            >

              <div
                className="relative h-full w-full duration-700"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flipped
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)",
                  transition: "transform 700ms cubic-bezier(.2,.8,.2,1)",
                }}
              >

                {/* FRONT */}

                <div
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-[32px] border border-slate-200 bg-white px-12 shadow-lg"
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                >

                  <span className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-600">
                    Question
                  </span>

                  <h3 className="mt-8 text-center text-3xl font-bold leading-relaxed text-slate-900">
                    {card.question}
                  </h3>

                  <p className="mt-10 text-sm text-slate-400">
                    Click anywhere to reveal the answer
                  </p>

                </div>

                {/* BACK */}

                <div
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-[32px] bg-slate-900 px-12 text-white shadow-lg"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                >

                  <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em]">
                    Answer
                  </span>

                  <h3 className="mt-8 text-center text-3xl font-semibold leading-relaxed">
                    {card.answer}
                  </h3>

                  <p className="mt-10 text-sm text-slate-300">
                    Click again to view the question
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Navigation */}

          <div className="mt-10 flex items-center justify-between">

            <button
              onClick={prevCard}
              disabled={current === 0}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
            >
              Previous
            </button>

            <div className="rounded-full border border-slate-200 bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-700">
              {current + 1} / {flashcards.length}
            </div>

            <button
              onClick={nextCard}
              disabled={current === flashcards.length - 1}
              className="rounded-2xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800 disabled:opacity-40"
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default FlashcardsSection;