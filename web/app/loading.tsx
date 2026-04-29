import { GridSkeleton } from "@/components/loading-skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="h-10 bg-[#13131A] rounded w-64 mb-2 animate-pulse" />
      <div className="h-4 bg-[#13131A] rounded w-32 mb-8 animate-pulse" />
      <div className="h-10 bg-[#13131A] rounded w-80 mb-6 animate-pulse" />
      <GridSkeleton count={12} />
    </div>
  );
}
