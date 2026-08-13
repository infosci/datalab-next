import type { Metadata } from "next";
import { getPublicationsByYear, isLabAuthor, type Publication } from "@/lib/publications";

export const metadata: Metadata = { title: "Publications" };

function Authors({ authors }: { authors: string[] }) {
  return (
    <span>
      {authors.map((name, i) => (
        <span key={`${name}-${i}`}>
          {i > 0 && ", "}
          <span className={isLabAuthor(name) ? "text-black dark:text-zinc-50" : undefined}>
            {name}
          </span>
        </span>
      ))}
    </span>
  );
}

// "Journal of Informetrics 20(1), 101766" — assembled rather than templated,
// because online-first papers legitimately have no volume, issue, or pages yet
// and the punctuation has to survive their absence.
function venue(pub: Publication) {
  const issue = pub.issue ? `(${pub.issue})` : "";
  const locator = [`${pub.volume ?? ""}${issue}`.trim(), pub.pages].filter(Boolean).join(", ");
  return [pub.journal, locator].filter(Boolean).join(" ");
}

export default function PublicationsPage() {
  const years = getPublicationsByYear();
  const total = years.reduce((n, group) => n + group.items.length, 0);

  return (
    <div className="pt-6 sm:pt-10">
      <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl dark:text-zinc-50">
        Publications
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">{total} papers</p>

      <div className="mt-14 space-y-12">
        {years.map(({ year, items }) => (
          <section key={year ?? "undated"}>
            <h2 className="text-sm font-medium tracking-widest text-zinc-500 uppercase dark:text-zinc-500">
              {year ?? "Undated"}
            </h2>
            <ul className="mt-5 space-y-7">
              {items.map((pub) => (
                <li key={pub.doi ?? pub.title}>
                  <h3 className="leading-snug font-medium text-black dark:text-zinc-50">
                    {pub.url ? (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {pub.title}
                      </a>
                    ) : (
                      pub.title
                    )}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    <Authors authors={pub.authors} />
                  </p>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">{venue(pub)}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
