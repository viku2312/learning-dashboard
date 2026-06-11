export function SidebarSkeleton() {
  return (
    <aside
      className="hidden md:flex flex-col w-[220px] h-screen bg-bg-surface border-r border-bg-border flex-shrink-0"
      aria-hidden="true"
    >
      <div className="flex items-center gap-3 px-4 py-5 border-b border-bg-border">
        <div className="w-8 h-8 rounded-lg skeleton-shimmer" />
        <div className="w-20 h-4 rounded skeleton-shimmer" />
      </div>
      <div className="flex-1 py-4 px-2 space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-5 h-5 rounded skeleton-shimmer flex-shrink-0" />
            <div className="w-24 h-4 rounded skeleton-shimmer" />
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-bg-border">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full skeleton-shimmer" />
          <div className="space-y-1">
            <div className="w-20 h-3 rounded skeleton-shimmer" />
            <div className="w-14 h-3 rounded skeleton-shimmer" />
          </div>
        </div>
      </div>
    </aside>
  );
}
