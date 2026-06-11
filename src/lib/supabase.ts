import { createClient } from "@supabase/supabase-js";
import type { Course } from "@/types";

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file."
    );
  }

  return createClient(supabaseUrl, supabaseKey);
}

export async function getCourses(): Promise<Course[]> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase error fetching courses:", error.message);
      return getFallbackCourses();
    }

    if (!data || data.length === 0) {
      return getFallbackCourses();
    }

    return data as Course[];
  } catch (err) {
    console.error("Failed to connect to Supabase:", err);
    return getFallbackCourses();
  }
}

// Fallback data if Supabase is not configured or unreachable
function getFallbackCourses(): Course[] {
  return [
    {
      id: "1",
      title: "Advanced React Patterns",
      progress: 75,
      icon_name: "Layers",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "TypeScript Deep Dive",
      progress: 42,
      icon_name: "Code2",
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      title: "System Design Fundamentals",
      progress: 88,
      icon_name: "Network",
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      title: "CSS Architecture & Animations",
      progress: 60,
      icon_name: "Palette",
      created_at: new Date().toISOString(),
    },
  ];
}
