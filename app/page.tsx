import Link from "next/link";

// The three areas as cards, matching ddun.ai's gate: rounded-2xl, a hairline
// border, centered copy, and a copy block that grows so every card's footer
// sits on one line regardless of how the text wraps.
//
// Each is described through people / data / technology — the iSchool triad —
// so the three areas read as one framing applied to three domains rather than
// three unrelated blurbs.
const AREAS = [
  {
    title: "Science of Science",
    tagline: "How research gets made, and what makes it matter.",
    people: "Scientists, teams, institutions",
    data: "Publications, citations, funding records",
    technology: "Network analysis, text mining, predictive modeling",
  },
  {
    title: "Mental Health Informatics",
    tagline: "What data reveals about mental health, and the people it reaches.",
    people: "Patients, clinicians, online communities",
    data: "Health records, social media, population statistics",
    technology: "Machine learning, interpretable models, text mining",
  },
  {
    title: "Digital Humanities",
    tagline: "Computational readings of the cultural and historical record.",
    people: "Authors, readers, communities",
    data: "Texts, archives, cultural corpora",
    technology: "Text mining, knowledge graphs, visualization",
  },
];

function Facet({ label, value }: { label: string; value: string }) {
  return (
    <p className="mt-1.5 text-sm text-zinc-400 dark:text-zinc-500">
      <span className="text-zinc-500 dark:text-zinc-400">{label}</span> {value}
    </p>
  );
}

export default function Home() {
  return (
    <div className="pt-6 sm:pt-10">
      <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl dark:text-zinc-50">
        Yonsei DataLab
      </h1>

      <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-400">
        We study people, data, and technology — and what happens where the three
        meet.
      </p>

      <div className="mt-14 grid w-full gap-6 sm:grid-cols-3">
        {AREAS.map((area) => (
          <section
            key={area.title}
            className="flex flex-1 flex-col items-center gap-4 rounded-2xl border border-black/[.08] px-6 py-8 text-center dark:border-white/[.145]"
          >
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
              {area.title}
            </h2>
            <div className="max-w-sm grow">
              <p className="text-base text-balance text-zinc-600 dark:text-zinc-400">
                {area.tagline}
              </p>
              <div className="mt-4">
                <Facet label="People" value={area.people} />
                <Facet label="Data" value={area.data} />
                <Facet label="Technology" value={area.technology} />
              </div>
            </div>
          </section>
        ))}
      </div>

      <Link
        href="/publications/"
        className="mt-14 inline-block rounded-full border border-black/15 px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-black/[.04] dark:border-white/20 dark:text-zinc-50 dark:hover:bg-white/[.06]"
      >
        Read our work
      </Link>
    </div>
  );
}
