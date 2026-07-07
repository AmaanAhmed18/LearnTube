import { useEffect, useState } from "react";

function QuizSection({ quiz }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);

  if (!quiz || quiz.length === 0) return null;

  const question = quiz[current];

  useEffect(() => {
    setSelected(null);
    setChecked(false);
  }, [current]);

  function checkAnswer() {
    if (!selected) return;
    setChecked(true);
  }

  function nextQuestion() {
    if (current < quiz.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  }

  function previousQuestion() {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  }

  function optionClasses(option) {
    if (!checked) {
      return `
        border-slate-200
        hover:border-slate-900
        hover:bg-slate-50
      `;
    }

    if (option === question.correctAnswer) {
      return `
        border-emerald-500
        bg-emerald-50
        text-emerald-700
      `;
    }

    if (option === selected) {
      return `
        border-rose-400
        bg-rose-50
        text-rose-700
      `;
    }

    return `
      border-slate-200
      opacity-60
    `;
  }

  return (
    <section className="max-w-5xl mx-auto mt-12 mb-20">
      <div className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_35px_80px_rgba(15,23,42,0.10)]">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-stone-50" />

        <div className="absolute -top-40 -right-32 h-[340px] w-[340px] rounded-full bg-slate-200/40 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-[340px] w-[340px] rounded-full bg-stone-200/40 blur-3xl" />

        <div className="relative px-10 py-10 md:px-14 md:py-14">

          {/* Badge */}
          <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            Knowledge Check
          </div>

          {/* Heading */}
          <h2 className="mt-7 text-4xl font-bold tracking-tight text-slate-900">
            Quiz
          </h2>

          <p className="mt-3 text-lg text-slate-500">
            Test your understanding before moving on.
          </p>

          {/* Progress */}
          <div className="mt-10 flex items-center justify-between">

            <span className="text-sm font-medium text-slate-500">
              Question {current + 1} of {quiz.length}
            </span>

            <div className="h-2 w-52 overflow-hidden rounded-full bg-slate-200">

              <div
                className="h-full rounded-full bg-slate-900 transition-all duration-500"
                style={{
                  width: `${((current + 1) / quiz.length) * 100}%`,
                }}
              />

            </div>

          </div>

          {/* Question Card */}

          <div className="mt-10 rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">

            <h3 className="text-2xl font-semibold leading-relaxed text-slate-900">
              {question.question}
            </h3>

            <div className="mt-8 space-y-4">

              {question.options.map((option) => (
                <button
                  key={option}
                  disabled={checked}
                  onClick={() => setSelected(option)}
                  className={`
                    w-full
                    rounded-2xl
                    border
                    px-6
                    py-5
                    text-left
                    text-base
                    font-medium
                    transition-all
                    duration-300

                    ${
                      selected === option && !checked
                        ? "border-slate-900 bg-slate-100"
                        : ""
                    }

                    ${optionClasses(option)}
                  `}
                >
                  {option}
                </button>
              ))}

            </div>

            {!checked ? (

              <button
                disabled={!selected}
                onClick={checkAnswer}
                className="mt-8 rounded-2xl bg-slate-900 px-8 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-40"
              >
                Check Answer
              </button>

            ) : (

              <div
                className={`mt-8 rounded-2xl border p-5 font-medium ${
                  selected === question.correctAnswer
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-rose-200 bg-rose-50 text-rose-700"
                }`}
              >
                {selected === question.correctAnswer
                  ? "Correct! Great work."
                  : `Incorrect. The correct answer is "${question.correctAnswer}".`}
              </div>

            )}

          </div>

          {/* Navigation */}

          <div className="mt-10 flex items-center justify-between">

            <button
              onClick={previousQuestion}
              disabled={current === 0}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
            >
              Previous
            </button>

            <button
              onClick={nextQuestion}
              disabled={current === quiz.length - 1}
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

export default QuizSection;