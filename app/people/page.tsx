import type { Metadata } from "next";
import Image from "next/image";
import members from "@/data/members.json";

export const metadata: Metadata = { title: "People" };

type Member = {
  slug: string;
  name: string;
  role: string | null;
  photo: string | null;
  link: string | null;
  order: number;
};

// Fixed order rather than however the data happens to sort. "research interns"
// is included deliberately: the old site's display_categories list omitted it,
// so the two interns in the data never appeared on the page at all.
const ROLE_ORDER = [
  "principal investigator",
  "doctoral students",
  "master's students",
  "research interns",
  "visiting scholars",
  "alumni",
  "past visiting scholars",
];

function grouped() {
  const all = members as Member[];
  return ROLE_ORDER.map((role) => ({
    role,
    people: all.filter((m) => m.role === role).sort((a, b) => a.order - b.order),
  })).filter((g) => g.people.length > 0);
}

function Person({ person }: { person: Member }) {
  const body = (
    <>
      {person.photo ? (
        <Image
          src={person.photo}
          alt=""
          width={240}
          height={240}
          className="aspect-square w-full rounded-lg object-cover"
        />
      ) : (
        <div className="aspect-square w-full rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      )}
      <span className="mt-2.5 block text-sm leading-snug font-medium text-black dark:text-zinc-50">
        {person.name}
      </span>
    </>
  );

  return person.link ? (
    <a
      href={person.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block transition-opacity hover:opacity-80"
    >
      {body}
    </a>
  ) : (
    <div>{body}</div>
  );
}

export default function PeoplePage() {
  const groups = grouped();

  return (
    <div className="pt-6 sm:pt-10">
      <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl dark:text-zinc-50">
        People
      </h1>

      <div className="mt-14 space-y-14">
        {groups.map(({ role, people }) => (
          <section key={role}>
            <h2 className="text-sm font-medium tracking-widest text-zinc-500 uppercase dark:text-zinc-500">
              {role}
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
              {people.map((person) => (
                <li key={person.slug}>
                  <Person person={person} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
