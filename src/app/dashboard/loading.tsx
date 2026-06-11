import { BentoGridSkeleton } from "@/components/ui/BentoGridSkeleton";
import { SidebarSkeleton } from "@/components/ui/SidebarSkeleton";

export default function DashboardLoading() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      <SidebarSkeleton />
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
          <BentoGridSkeleton />
        </div>
      </main>
    </div>
  );
}
