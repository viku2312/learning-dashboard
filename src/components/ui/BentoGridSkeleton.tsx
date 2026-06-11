export function BentoGridSkeleton() {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 pb-24 md:pb-8"
      aria-label="Loading dashboard"
      aria-busy="true"
    >
      {/* Hero tile skeleton */}
      <div className="col-span-1 md:col-span-2 lg:col-span-8 rounded-2xl skeleton-shimmer min-h-[160px]" />
      
      {/* Stat tile skeleton */}
      <div className="col-span-1 lg:col-span-4 rounded-2xl skeleton-shimmer min-h-[160px]" />

      {/* Activity tile skeleton */}
      <div className="col-span-1 md:col-span-2 lg:col-span-7 rounded-2xl skeleton-shimmer h-48" />

      {/* Small stat skeletons */}
      <div className="col-span-1 lg:col-span-2 rounded-2xl skeleton-shimmer h-48" />
      <div className="col-span-1 lg:col-span-3 rounded-2xl skeleton-shimmer h-48" />

      {/* Course card skeletons */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="col-span-1 lg:col-span-3 rounded-2xl skeleton-shimmer"
          style={{ height: "170px" }}
        />
      ))}
    </section>
  );
}
