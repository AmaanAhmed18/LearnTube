// function NotesSection({ notes }) {
//   return (
//     <section className="max-w-5xl mx-auto mt-12">
//       <div className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_35px_80px_rgba(15,23,42,0.10)]">

//         {/* Background */}
//         <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-stone-50" />

//         {/* Decorative Blur */}
//         <div className="absolute -top-40 -right-32 h-[340px] w-[340px] rounded-full bg-slate-200/40 blur-3xl" />
//         <div className="absolute -bottom-40 -left-32 h-[340px] w-[340px] rounded-full bg-stone-200/40 blur-3xl" />

//         <div className="relative px-10 py-10 md:px-14 md:py-14">

//           {/* Badge */}
//           <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
//             Study Notes
//           </div>

//           {/* Heading */}
//           <h2 className="mt-7 text-4xl font-bold tracking-tight text-slate-900">
//             Smart Notes
//           </h2>

//           <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-500">
//             Every important concept extracted and organized into clear,
//             structured notes for quick revision.
//           </p>

//           {/* Accent Line */}
//           <div className="mt-5 h-[3px] w-20 rounded-full bg-slate-900" />

//           {/* Notes */}

//           <div className="mt-12 space-y-7">

//             {notes.map((note, index) => (

//               <div
//                 key={index}
//                 className="group rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
//               >

//                 <div className="flex gap-6">

//                   {/* Number */}

//                   <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-900 text-lg font-semibold text-white shadow-sm">

//                     {String(index + 1).padStart(2, "0")}

//                   </div>

//                   {/* Content */}

//                   <div className="flex-1">

//                     <h3 className="text-2xl font-semibold tracking-tight text-slate-900">

//                       {note.title}

//                     </h3>

//                     <p className="mt-5 text-[17px] leading-9 text-slate-600">

//                       {note.content}

//                     </p>

//                   </div>

//                 </div>

//               </div>

//             ))}

//           </div>

//           {/* Footer */}

//           <div className="mt-14 border-t border-slate-200 pt-6">

//             <p className="text-xs font-medium uppercase tracking-[0.30em] text-slate-400">

//               LearnTube

//             </p>

//             <p className="mt-2 text-sm text-slate-600">

//               AI-generated study notes designed for faster learning and revision.

//             </p>

//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }

// export default NotesSection;

import { useState } from "react";

function NotesSection({ notes }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="max-w-5xl mx-auto mt-12">
      <div className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_35px_80px_rgba(15,23,42,0.10)]">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-stone-50" />

        {/* Decorative Blur */}
        <div className="absolute -top-40 -right-32 h-[340px] w-[340px] rounded-full bg-slate-200/40 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-[340px] w-[340px] rounded-full bg-stone-200/40 blur-3xl" />

        <div className="relative px-10 py-10 md:px-14 md:py-14">

          {/* Badge */}
          <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            Study Notes
          </div>

          {/* Heading */}
          <h2 className="mt-7 text-4xl font-bold tracking-tight text-slate-900">
            Smart Notes
          </h2>

          <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-500">
            Every important concept extracted and organized into clear,
            structured notes for quick revision.
          </p>

          {/* Accent Line */}
          <div className="mt-5 h-[3px] w-20 rounded-full bg-slate-900" />

          {/* Search */}
          <div className="mt-10">
            <div className="relative">
              <svg
                className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20L17 17" />
              </svg>

              <input
                type="text"
                placeholder="Search your notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-14 pr-5 text-lg text-slate-700 shadow-sm outline-none transition-all duration-300 focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="mt-12 space-y-7">

            {filteredNotes.length > 0 ? (
              filteredNotes.map((note, index) => (
                <div
                  key={index}
                  className="group rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex gap-6">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-900 text-lg font-semibold text-white shadow-sm">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="flex-1">

                      <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                        {note.title}
                      </h3>

                      <p className="mt-5 text-[17px] leading-9 text-slate-600">
                        {note.content}
                      </p>

                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
                <h3 className="text-2xl font-semibold text-slate-700">
                  No matching notes found
                </h3>

                <p className="mt-3 text-slate-500">
                  Try searching with different keywords.
                </p>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="mt-14 border-t border-slate-200 pt-6">

            <p className="text-xs font-medium uppercase tracking-[0.30em] text-slate-400">
              LearnTube
            </p>

            <p className="mt-2 text-sm text-slate-600">
              AI-generated study notes designed for faster learning and revision.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default NotesSection;