# LearnOS — Next-Gen Learning Dashboard

A high-fidelity student dashboard built with Next.js 14, Supabase, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd learning-dashboard
npm install
```

### 2. Set Up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in your Supabase dashboard and run:

```sql
-- Create the courses table
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  icon_name TEXT NOT NULL DEFAULT 'BookOpen',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed with sample data
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns', 75, 'Layers'),
  ('TypeScript Deep Dive', 42, 'Code2'),
  ('System Design Fundamentals', 88, 'Network'),
  ('CSS Architecture & Animations', 60, 'Palette');

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Allow public read access (adjust for your auth setup)
CREATE POLICY "Allow public read" ON courses FOR SELECT USING (true);
```

3. Copy your project URL and anon key from **Settings → API**

### 3. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Architecture

### Server / Client Component Split

| Component | Type | Reason |
|---|---|---|
| `app/dashboard/page.tsx` | **Server** | Fetches Supabase data at request time, no client JS needed |
| `components/layout/Sidebar.tsx` | **Client** | Needs `useState` for collapse/active state |
| `components/dashboard/BentoGrid.tsx` | **Client** | Framer Motion `motion.*` elements require client context |
| `components/dashboard/CourseCard.tsx` | **Client** | `useInView` hook for scroll-triggered animations |
| `components/dashboard/HeroTile.tsx` | **Client** | Framer Motion animations |
| `lib/supabase.ts` | **Server-only** | Direct DB access, never sent to client |

**Data flow:** `page.tsx` (Server) → fetches `courses[]` → passes as props → `BentoGrid` (Client) renders with animations.

### Key Architectural Decisions

**1. RSC-first data fetching**  
`getCourses()` runs only on the server. The Supabase URL and key are read via `process.env` and never exposed in the client bundle. The client components receive already-resolved data as props.

**2. Graceful degradation**  
If Supabase is unreachable or env vars are missing, `getFallbackCourses()` returns static mock data so the UI never breaks during local dev or demo.

**3. Zero layout shift animations**  
All Framer Motion animations use only `transform` (scale, translateY) and `opacity`. No width/height/padding/margin changes during animation means zero CLS.

**4. Spring physics everywhere**  
Card hover states use `type: "spring", stiffness: 300, damping: 20` per the spec. Sidebar highlight uses `layoutId="nav-highlight"` for the snap-in effect.

**5. Suspense boundaries**  
`loading.tsx` provides instant skeleton UI while the async server component resolves. An additional `<Suspense>` boundary in `page.tsx` wraps the grid as a safety net.

---

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## 🌐 Deployment

Deploy with one click on Vercel. Add your environment variables in the Vercel dashboard under **Settings → Environment Variables**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## Supported `icon_name` Values

When adding courses to Supabase, use any of these values for `icon_name`:

`Layers` · `Code2` · `Network` · `Palette` · `BookOpen` · `Cpu` · `Globe` · `Database` · `GitBranch` · `Sparkles`
