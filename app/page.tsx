import Link from "next/link";

// The three areas the lab works in. Plain text, deliberately: the old site put
// three illustrations here, one of which was a stock Einstein quote meme with
// another site's watermark on it. Titles carry the meaning; the images carried
// 4MB and a licensing problem.
const AREAS = [
  {
    title: "Science of Science",
    blurb:
      "How research is produced, collaborates, and accrues impact — studied on scientific publications, citations, and funding records at scale.",
  },
  {
    title: "Mental Health Informatics",
    blurb:
      "What healthcare records, social media, and population data reveal about mental health, its determinants, and the people it reaches.",
  },
  {
    title: "Digital Humanities",
    blurb:
      "Computational readings of cultural and historical corpora — text, networks, and the questions humanists have always asked.",
  },
];

export default function Home() {
  return (
    <div className="pt-6 sm:pt-10">
      {/* No logo here on purpose. The only asset that exists (datalab_logo.jpg)
          is a raster with an opaque grey background baked in, so it renders as a
          grey box on both the dark and light palettes — and its wordmark just
          repeats the heading below it. A theme-aware SVG mark, like ddun.ai's,
          would earn a place here; the JPEG does not. */}
      <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl dark:text-zinc-50">
        Yonsei DataLab
      </h1>

      <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-400">
        We do data-driven research at Yonsei University — developing and applying
        data science methods to publications, health records, social media, and
        cultural corpora.
      </p>

      <div className="mt-14 space-y-10">
        {AREAS.map(({ title, blurb }) => (
          <section key={title}>
            <h2 className="text-xl font-medium text-black dark:text-zinc-50">{title}</h2>
            <p className="mt-2 max-w-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
              {blurb}
            </p>
          </section>
        ))}
      </div>

      {/* The outline pill from ddun.ai and ddun.io, theme-aware, so the three
          sites read as a family. One way in — the work itself. */}
      <Link
        href="/publications/"
        className="mt-14 inline-block rounded-full border border-black/15 px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-black/[.04] dark:border-white/20 dark:text-zinc-50 dark:hover:bg-white/[.06]"
      >
        Read our work
      </Link>
    </div>
  );
}
