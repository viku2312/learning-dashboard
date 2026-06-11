import { Suspense } from "react";
import { getCourses } from "@/lib/supabase";
import { Sidebar } from "@/components/layout/Sidebar";
import { BentoGrid } from "@/components/dashboard/BentoGrid";
import { BentoGridSkeleton } from "@/components/ui/BentoGridSkeleton";

export default async function DashboardPage() {
  const courses = await getCourses();

  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      <Sidebar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
          <Suspense fallback={<BentoGridSkeleton />}>
            <BentoGrid courses={courses} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
