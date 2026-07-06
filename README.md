# Hi, I'm Htet Lin Ko 👋

**Senior Frontend Developer at Better HR · Full-stack engineer**

I ship production HR SaaS by day and build end-to-end systems on the side — API to database, auth to UI. Four years into a multi-tenant HR platform used across multiple countries, currently shipping features on the frontend migration from a legacy Vue / Nuxt app to a modern React, TypeScript, and Vite stack.

Before software, I worked as a Network Engineer at Frontiir. That background taught me how to troubleshoot systems and reason about where information gets stuck — the same instinct I use today in a Postgres schema or a JWT round-trip.

🌐 Portfolio: https://www.htetlinko.com

---

## 🚀 What I Do

- Ship production frontend features in a multi-tenant HR SaaS — payroll, recruitment, appraisals, customer management, job platforms, marketing sites
- Build features on a Vue / Nuxt → React 19 migration with clients live on both stacks
- Build full-stack side projects — schema, API, auth, permissions, and UI, end to end
- Design permission models, GraphQL contracts, and i18n workflows that survive real production use
- Integrate AI (structured JSON responses, per-user data controls) into learning products

---

## 🧩 Current Focus

- Shipping features on the Better HR frontend migration to React 19 + TanStack + shadcn/ui, alongside the existing Vue app
- Full-stack side projects covering RBAC, realtime, cloud file storage, video processing, and AI integration
- System design and backend architecture — schema shape, contract design, permission topology
- Learning and building with Claude Code and AI agents in real workflows

---

## 🛠 Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs)
![Nuxt.js](https://img.shields.io/badge/Nuxt.js-00DC82?style=for-the-badge&logo=nuxtdotjs)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![TanStack](https://img.shields.io/badge/TanStack-FF4154?style=for-the-badge&logo=react-query&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express)
![REST API](https://img.shields.io/badge/REST_API-FF6B6B?style=for-the-badge)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio)

### Database & Storage

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare_R2-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

### DevOps & Tools

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git)
![GitLab CI](https://img.shields.io/badge/GitLab_CI-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel)

---

## 💼 Better HR — Senior Frontend Developer

Four years at a multi-tenant HR SaaS platform used across multiple countries. Promoted from Junior to Senior after taking ownership of complex frontend modules and frontend architecture decisions.

**React Migration Platform (current)**
Shipping features on the migration from legacy Vue 2 / Nuxt to React 19 + TypeScript + Vite. Payroll, employees, leaves, attendance, KPI, performance appraisal, and recruitment / ATS flows with shared permission logic, i18n, and multi-country payroll (Pusher realtime, FX handling). Stack: TanStack Router / Query / Form / Table, Apollo Client, Tailwind v4, shadcn/ui, Storybook, Vitest.

**Internal Customer Management Platform (Nuxt 3 / Vue 3)**
Led frontend architecture for ~15 pages of customer lifecycle, contracts, expense workflow, file upload, and reporting. CASL permission system with route guards. Microsoft OAuth SSO, Xero accounting sync, and secure bank payment / salary disbursement from the frontend side.

**Marketing Website (Next.js)**
14-locale i18n with geo-routing and 100+ localized pages. SEO infrastructure — hreflang, JSON-LD, dynamic sitemap, `llms.txt` for AI crawlers. GitLab CI/CD → AWS S3 + CloudFront.

**Better Jobs Platform (Nuxt 3 / Vue 3)**
Candidate-facing job portal serving 7 countries. 5 GraphQL services, SSR auth, realtime messaging via Laravel Echo / Pusher, Firebase push notifications.

**As Junior — Payroll & ATS**
Led the frontend Payroll module (default, multi-country, settings, policy workflows) with country rollouts for Myanmar, Sri Lanka, and Thailand. Built the Applicant Tracking System from scratch — candidate pipeline, CV preview, recruiter workflows, public embeddable job listings. Delivered payroll features with zero reopened production bugs.

---

## 📌 Featured Projects

### 📝 AI English Journal

Bilingual AI journaling app for English learners — writing prompts, grammar feedback, and draft help in English and Myanmar.

- Next.js + TypeScript + Supabase PostgreSQL with Row Level Security
- Structured JSON responses from Google Gemini for grammar feedback, prompts, and drafts
- Per-user AI toggle so users control whether journal content is shared with the model
- shadcn/ui + Tailwind CSS

**Live:** https://vct-ai-english-journal.vercel.app/
**GitHub:** https://github.com/HtetLin27/vct-ai-english-journal

---

### 🎫 Customer Support Ticketing System

Full-stack support desk with three roles, a real ticket queue, and realtime updates — REST-first, realtime as an overlay.

- React + Node.js + Express + PostgreSQL + Sequelize
- JWT auth with role-based permissions (customer / agent / admin)
- Socket.IO for live ticket updates while REST APIs stay the source of truth
- Docker Compose with seed data that mimics a real support queue

**GitHub:** https://github.com/HtetLin27/customer_support_ticketing_system

---

### 📚 Learning Management System

Full-stack LMS — role-based access, signed-URL video streaming, server-side quiz scoring, generated certificates. Built from the schema up.

- Node.js + Express + PostgreSQL — 11 tables, 3 roles (student / instructor / admin)
- Sequelize ORM, Multer uploads, FFmpeg for video processing
- Cloudflare R2 storage with signed URLs so video links can't be shared past expiry
- Server-side quiz scoring — no client-side tampering possible
- PDFKit certificate generation on progress completion
- React + Vite + Zustand + TanStack Query on the frontend, shadcn/ui + Tailwind CSS
- Docker Compose for local development

**GitHub:** https://github.com/HtetLin27/lms_system

---

### 🧑‍💻 OPOM Portfolio Platform

Community portfolio and team-collaboration platform for the One Project One Month community. Led the frontend as part of a small team, and mentored other developers working on the codebase.

- React 19 + TypeScript + Vite, React Router, TanStack Query, Zustand
- Full auth flows — email/password, OTP verification, forgot/reset password, GitHub + Google OAuth
- Axios refresh-token retry interceptor that queues in-flight calls during token refresh and auto-redirects banned users (HTTP 451)
- Zustand store backed by AES-encrypted localStorage (SHA-256 hashed keys)
- Role-based routing (USER / ADMIN) with lazy-loaded route modules
- Radix UI + Tailwind v4 + React Hook Form + Zod, Chart.js dashboards for admin analytics

**GitHub:** https://github.com/one-project-one-month/1P1M_Portfolio_React

---

## 📈 GitHub Stats

![Htet's GitHub stats](https://github-readme-stats.vercel.app/api?username=HtetLin27&show_icons=true&theme=tokyonight)

![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=HtetLin27&layout=compact&theme=tokyonight)

---

## 🎓 Certifications

- **Anthropic Claude 101** — [Verify](https://verify.skilljar.com/c/qofoukq9isre)
- **Anthropic Claude Code 101** — [Verify](https://verify.skilljar.com/c/fvxd7z36pdvf)
- **Meta Front-End Developer Professional Certificate** — Coursera
- **CS50x: Introduction to Computer Science** — Harvard University
- **Cisco Routing and Switching Certification**

---

## 🌱 Learning Direction

- System design and backend architecture
- Database design and schema shape
- Permission models and RBAC topology
- Real-world production concerns — i18n, migration strategy, contract stability
- AI integration patterns — structured outputs, per-user data controls, agent-assisted workflows

---

## 📫 Connect With Me

- 🌐 Portfolio: https://www.htetlinko.com
- 💼 LinkedIn: https://www.linkedin.com/in/htet-lin-ko-411b02204
- 🐙 GitHub: https://github.com/HtetLin27
- 📧 Email: htetlinko.dev@gmail.com
