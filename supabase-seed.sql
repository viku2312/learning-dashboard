-- Run this in your Supabase SQL Editor
-- =====================================

-- 1. Create the courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  icon_name TEXT NOT NULL DEFAULT 'BookOpen',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Insert seed data
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns', 75, 'Layers'),
  ('TypeScript Deep Dive', 42, 'Code2'),
  ('System Design Fundamentals', 88, 'Network'),
  ('CSS Architecture & Animations', 60, 'Palette');

-- 3. Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- 4. Allow public read (adjust if you add auth)
CREATE POLICY "Allow public read" ON courses
  FOR SELECT USING (true);
