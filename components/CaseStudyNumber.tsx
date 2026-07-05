export function CaseStudyNumber({
  number,
  slug,
}: {
  number: string;
  slug: string;
}) {
  return (
    <span
      style={{ viewTransitionName: `project-number-${slug}` }}
      className="font-serif leading-none text-bone text-[clamp(6rem,18vw,20rem)]"
    >
      {number}
    </span>
  );
}
