function SummaryCard({ summary }) {
  return (
    <section className="max-w-5xl mx-auto mb-12">
      <div className="relative overflow-hidden rounded-[36px] border border-slate-200/80 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_35px_80px_rgba(15,23,42,0.10)]">

        {/* Soft Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-stone-50" />

        {/* Decorative Blobs */}
        <div className="absolute -top-40 -right-32 h-[340px] w-[340px] rounded-full bg-slate-200/40 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-[340px] w-[340px] rounded-full bg-stone-200/40 blur-3xl" />

        <div className="relative px-10 py-10 md:px-14 md:py-14">

          {/* Small Badge */}
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            Learning Overview
          </div>

          {/* Heading */}
          <h2 className="mt-7 text-4xl font-bold tracking-tight text-slate-900">
            Summary
          </h2>

          {/* Accent Line */}
          <div className="mt-5 h-[3px] w-20 rounded-full bg-slate-900" />

          {/* Content */}
          <p className="mt-10 max-w-3xl whitespace-pre-line text-[18px] leading-9 text-slate-600">
            {summary}
          </p>

          {/* Footer */}
          <div className="mt-14 flex flex-col gap-6 border-t border-slate-200 pt-7 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.30em] text-slate-400">
                LearnTube
              </p>

              <p className="mt-2 text-sm text-slate-600">
                AI-powered learning summary generated from the video transcript.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm">
              Ready to Study
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default SummaryCard;