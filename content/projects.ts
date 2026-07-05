export type ReelPanelKind = "metrics" | "diagram" | "pullquote" | "statement";

export type WorkPanel =
  | { kind: "pullquote"; text: string }
  | { kind: "numbers"; items: string[] }
  | { kind: "screenshot"; caption: string; src?: string; placeholder?: true }
  | { kind: "diagram"; caption: string; steps: string[] };

export type Project = {
  slug: string;
  number: string;
  name: string;
  client: string;
  role: string;
  timeframe: string;
  links?: { label: string; href: string }[];
  reel: ReelData;
  study: {
    problem: string[];
    workPanels: WorkPanel[];
    reflection: string;
  };
};

type ReelData =
  | { kind: "metrics"; oneLiner: string; metrics: string[] }
  | { kind: "diagram"; oneLiner: string; flow: string[] }
  | { kind: "pullquote"; quote: string }
  | { kind: "statement"; lines: [string, string] };

export const PROJECTS: Project[] = [
  {
    slug: "ai-english-journal",
    number: "01",
    name: "AI English Journal",
    client: "Personal",
    role: "Full-stack",
    timeframe: "2025",
    links: [
      { label: "Live", href: "https://vct-ai-english-journal.vercel.app/" },
      { label: "GitHub", href: "https://github.com/HtetLin27/vct-ai-english-journal" },
    ],
    reel: {
      kind: "metrics",
      oneLiner:
        "A bilingual journaling app for English learners — writing prompts, grammar feedback, and draft help in English and Myanmar.",
      metrics: [
        "Next.js + Supabase",
        "Row-level security",
        "Structured JSON from Gemini",
        "Bilingual · EN / MY",
        "Live",
      ],
    },
    study: {
      problem: [
        "English learners write in their second language every day, but the feedback loop is slow — a teacher, if they have one, sees the entry days later, and the correction lands out of context. The gap between writing and understanding what went wrong is where the habit falls apart.",
        "AI can close that loop, but only if the app is careful about two things: bilingual feedback that meets a learner in their first language, and a clean line between the user's private journal and the model. Neither one is optional if this is going to be trusted.",
        "I built AI English Journal as a full-stack Next.js app — Supabase Postgres with row-level security so each user's entries stay theirs, structured JSON responses from Gemini so grammar feedback, prompts, and drafts arrive in a consistent shape, and a per-user toggle that gates whether journal content is shared with the model at all.",
      ],
      workPanels: [
        {
          kind: "pullquote",
          text: "The feedback loop is where language learning breaks down. AI can close it — carefully.",
        },
        {
          kind: "diagram",
          caption: "Request path — auth → RLS → structured LLM response",
          steps: ["Client", "Supabase Auth", "API Route", "RLS Postgres", "Gemini"],
        },
        {
          kind: "numbers",
          items: [
            "Next.js + TypeScript",
            "Supabase Postgres",
            "Row-level security",
            "Gemini structured JSON",
          ],
        },
        {
          kind: "screenshot",
          caption: "Journal entry — bilingual feedback, per-user AI toggle",
          src: "/projects/ai-english-journal.png",
        },
      ],
      reflection:
        "Structured JSON responses were the single decision that made this feel like software instead of a prompt wrapper — grammar feedback in a schema, prompts in a schema, drafts in a schema. Everything downstream became typed. If I rebuilt this, I'd design the schema first and let the UI grow from it.",
    },
  },
  {
    slug: "support-ticketing-system",
    number: "02",
    name: "Customer Support Ticketing System",
    client: "Personal",
    role: "Full-stack",
    timeframe: "2025",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/HtetLin27/customer_support_ticketing_system",
      },
    ],
    reel: {
      kind: "diagram",
      oneLiner:
        "A support desk with three roles, a real ticket queue, and realtime updates that don't lie about the source of truth.",
      flow: ["Customer", "Ticket", "Agent", "Admin", "Realtime"],
    },
    study: {
      problem: [
        "Every support tool I've used treats realtime as the source of truth. It isn't. The source of truth is the database — the API is the contract — and realtime is the layer that keeps clients in sync between requests. When those get confused, the queue starts lying to people.",
        "I built this end-to-end: JWT-authenticated REST APIs for tickets, replies, and history. Postgres tables shaped around audit tracking so nothing gets rewritten. Socket.IO overlaid on top of REST for live status changes — but the API is always what actually persists.",
        "The whole stack ships in Docker Compose with seed data that mimics a real queue, so the demo isn't a shell. There are customers, agents, admins, tickets in every state, and a permission model that behaves like a support desk actually behaves.",
      ],
      workPanels: [
        {
          kind: "pullquote",
          text: "The database is the source of truth. Realtime keeps clients honest between requests.",
        },
        {
          kind: "diagram",
          caption: "System — REST-first, realtime overlay",
          steps: [
            "Client",
            "JWT",
            "REST API",
            "Postgres + Sequelize",
            "Socket.IO",
          ],
        },
        {
          kind: "numbers",
          items: [
            "React + Node + Express",
            "Postgres + Sequelize",
            "Socket.IO",
            "Docker Compose",
          ],
        },
        {
          kind: "screenshot",
          caption: "Agent queue — tickets, priority, assignment",
          src: "/projects/support-ticketing-system.png",
        },
      ],
      reflection:
        "Building the backend for this taught me how much frontend framework noise I'd been carrying — how many decisions I was making by convention instead of by need. When you own the whole stack, the app gets smaller. Fewer moving parts, clearer seams.",
    },
  },
  {
    slug: "lms-system",
    number: "03",
    name: "Learning Management System",
    client: "Personal",
    role: "Full-stack",
    timeframe: "2025",
    links: [
      { label: "GitHub", href: "https://github.com/HtetLin27/lms_system" },
    ],
    reel: {
      kind: "diagram",
      oneLiner:
        "A full-stack learning platform with role-based access, signed-URL video streaming, and server-side quiz scoring — built from the schema up.",
      flow: ["Student", "JWT", "Role", "Course", "Quiz", "Cert"],
    },
    study: {
      problem: [
        "Every LMS demo I've seen skips the parts that make an LMS actually work. Course pages are easy. Video upload is easy. The parts that decide whether a real learning platform is trustworthy — server-side quiz scoring, video files that can't be shared, certificates that mean something, three role systems that don't leak permissions — those are the parts most tutorials wave past.",
        "I built this one from the schema up. Eleven Postgres tables with proper relationships, JWT auth with role-based access for students, instructors, and admins, video processing through FFmpeg, and files stored in Cloudflare R2 behind signed URLs so the only way to watch a video is through the app. Quiz scoring lives on the server, so nothing about a score can be tampered with client-side. Certificates are generated by PDFKit only when progress crosses the threshold.",
        "The frontend mirrors the backend's roles: a student never sees the instructor's draft page, an instructor never sees the admin's approval queue. Uploads report real progress. Video streams through the signed-URL layer so links can't be shared past their expiry. The whole thing runs in Docker Compose — one command to bring the stack up, one command to seed it, so the demo is never a shell.",
      ],
      workPanels: [
        {
          kind: "pullquote",
          text: "A learning platform earns trust in the parts users never see — the quiz scorer, the signed URL, the role guard.",
        },
        {
          kind: "diagram",
          caption:
            "Signed-URL video pipeline — R2 stores it, the app streams it, links expire",
          steps: ["Instructor", "Upload", "FFmpeg", "R2", "Signed URL", "Player"],
        },
        {
          kind: "numbers",
          items: [
            "Node + Express + Postgres",
            "11 tables · 3 roles",
            "Sequelize + Multer + FFmpeg",
            "Cloudflare R2 + signed URLs",
            "React + Vite + Zustand",
          ],
        },
        {
          kind: "screenshot",
          caption: "Instructor dashboard — course draft to published pipeline",
          src: "/projects/lms-system.png",
        },
      ],
      reflection:
        "Building an LMS from scratch teaches you that the interesting parts aren't the ones people click on. Nobody sees the signed-URL layer. Nobody sees the quiz scorer refusing to trust the client. Nobody sees the role guard. But those are the parts that decide whether the platform can be trusted with a real course. Next time I'd start with them — schema, permissions, and the signature parts of trust — before writing a single component.",
    },
  },
  {
    slug: "opom-portfolio",
    number: "04",
    name: "OPOM Portfolio",
    client: "One Project One Month",
    role: "Frontend Lead",
    timeframe: "2025",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/one-project-one-month/1P1M_Portfolio_React",
      },
    ],
    reel: {
      kind: "diagram",
      oneLiner:
        "A community portfolio platform led by three frontend leads — auth, route guards, and an encrypted session store, built to be extended by the developers we mentored.",
      flow: ["User", "OAuth", "Guard", "Admin", "Session"],
    },
    study: {
      problem: [
        "One Project One Month is a Myanmar developer community that ships things — every month, a new project, a new team. The portfolio platform was the community's public face: portfolios, developers, ideas, timelines. It also had to be a workspace, with an admin panel that could actually govern a growing community without becoming a moderation nightmare.",
        "The frontend was led by a small group of us, and that only worked because we spent the first weeks agreeing on shape — how routes would be guarded, how the client would store an auth token safely, how the Axios instance would handle a refresh mid-request without blowing up ten in-flight calls. Those weren't nice-to-haves. They were the seams the rest of the code hangs off.",
        "Then there were the developers we were mentoring. A shared codebase is a mirror — every shortcut you take shows up as a shortcut someone else has to work around. Leading meant writing less clever code, more legible code, and reviewing pull requests slowly enough to explain why, not just what.",
      ],
      workPanels: [
        {
          kind: "pullquote",
          text: "Shared frontends are only faster if you agree on shape before you write anything.",
        },
        {
          kind: "diagram",
          caption:
            "Refresh-token interceptor — in-flight calls queued during refresh",
          steps: ["Request", "401", "Refresh", "Queue + retry", "Resume"],
        },
        {
          kind: "numbers",
          items: [
            "React 19 + Vite",
            "TanStack Query + Zustand",
            "Radix + Tailwind v4",
            "Axios interceptor",
            "AES-encrypted store",
          ],
        },
        {
          kind: "screenshot",
          caption: "Admin panel — portfolios, ideas, users, timelines",
          src: "/projects/opom-portfolio.png",
        },
      ],
      reflection:
        "Leading a shared frontend isn't writing more code. It's writing the parts that would otherwise get invented three times — the Axios client, the auth store, the route guards — and writing them so the next person can extend them without asking permission. The interceptor queue and the encrypted store are the boring parts. They're also the parts I'd build first, next time.",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  return next;
}
