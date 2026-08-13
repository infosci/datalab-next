import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { readMarkdown } from "@/lib/markdown";
import { asset } from "@/lib/assets";

// The route is /yongjunzhu/ rather than /people/yongjunzhu/ because that is the
// URL the old site used and the one that exists in other people's links and
// citations. Keeping it costs nothing; breaking it would be silent.
const doc = readMarkdown("yongjunzhu");

export const metadata: Metadata = {
  title: doc.meta.name ?? "Yongjun Zhu",
  description: `${doc.meta.role} at DataLab, ${doc.meta.affiliation}.`,
};

export default function YongjunZhuPage() {
  const { meta, body } = doc;

  return (
    <div className="pt-6 sm:pt-10">
      <Image
        src={asset("/people/yongjunzhu2.webp")}
        alt=""
        width={160}
        height={160}
        priority
        className="size-28 rounded-lg object-cover"
      />

      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-black sm:text-5xl dark:text-zinc-50">
        {meta.name}
      </h1>
      {meta.alsoKnownAs && (
        <p className="mt-2 text-lg text-zinc-500 dark:text-zinc-500">{meta.alsoKnownAs}</p>
      )}
      <p className="mt-4 max-w-xl text-zinc-600 dark:text-zinc-400">
        {meta.role} · {meta.affiliation}
      </p>

      {/* Markdown drives everything below, so updating this page means editing
          content/yongjunzhu.md and nothing else. Headings and paragraphs are
          styled here rather than through a prose plugin, to stay consistent
          with the rest of the site's type scale. */}
      <div className="mt-14">
        <ReactMarkdown
          components={{
            h2: ({ children }) => (
              <h2 className="mt-12 mb-5 text-sm font-medium tracking-widest text-zinc-500 uppercase first:mt-0 dark:text-zinc-500">
                {children}
              </h2>
            ),
            p: ({ children }) => (
              <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">{children}</p>
            ),
            strong: ({ children }) => (
              <strong className="font-medium text-black dark:text-zinc-50">{children}</strong>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                {children}
              </a>
            ),
          }}
        >
          {body}
        </ReactMarkdown>
      </div>

      <Link
        href="/people/"
        className="mt-16 inline-block rounded-full border border-black/15 px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-black/[.04] dark:border-white/20 dark:text-zinc-50 dark:hover:bg-white/[.06]"
      >
        All people
      </Link>
    </div>
  );
}
