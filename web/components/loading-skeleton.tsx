export function BrandCardSkeleton() {
  return (
    <div className="bg-[#13131A] border border-[#1E1E2E] rounded-xl p-4 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#1E1E2E]" />
        <div className="flex-1">
          <div className="h-3 bg-[#1E1E2E] rounded w-16 mb-2" />
          <div className="h-4 bg-[#1E1E2E] rounded w-32" />
          <div className="h-3 bg-[#1E1E2E] rounded w-24 mt-2" />
        </div>
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading..."
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
    >
      {Array.from({ length: count }).map((_, i) => (
        <BrandCardSkeleton key={i} />
      ))}
    </div>
  );
}
