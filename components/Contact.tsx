import { Mark } from "./Mark";
import { YangonClock } from "./YangonClock";

const LINKS = [
  { label: "htetlinko.dev@gmail.com", href: "mailto:htetlinko.dev@gmail.com" },
  { label: "github.com/HtetLin27", href: "https://github.com/HtetLin27" },
  {
    label: "linkedin.com/in/htet-lin-ko",
    href: "https://www.linkedin.com/in/htet-lin-ko-411b02204",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative flex h-screen w-full flex-col items-center justify-center px-6 md:px-12"
    >
      <div className="absolute top-6 left-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        05 · Contact
      </div>
      <p className="font-serif text-[clamp(5rem,18vw,16rem)] leading-none italic text-bone">
        available
      </p>

      <ul className="mt-16 flex flex-col items-center gap-4 font-mono text-[13px] uppercase tracking-[0.14em] text-bone/85">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target={l.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                l.href.startsWith("mailto:") ? undefined : "noopener noreferrer"
              }
              className="group relative inline-block py-1"
            >
              <span className="relative z-10">{l.label}</span>
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-bone transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
            </a>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-6 left-6 h-10 w-10">
        <Mark className="h-full w-full text-bone/60" animate={false} />
      </div>

      <div className="absolute bottom-6 right-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        Yangon · UTC+6:30 <YangonClock />
      </div>
    </section>
  );
}
