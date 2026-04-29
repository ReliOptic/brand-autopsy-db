export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      <div className="h-8 bg-[#13131A] rounded w-48 mb-6" />
      <div className="flex gap-4 mb-8">
        <div className="flex-1 h-14 bg-[#13131A] rounded-xl" />
        <div className="flex-1 h-14 bg-[#13131A] rounded-xl" />
      </div>
      <div className="flex gap-6">
        <div className="flex-1 space-y-3">
          <div className="h-40 bg-[#13131A] rounded-xl" />
          <div className="h-64 bg-[#13131A] rounded-xl" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="h-40 bg-[#13131A] rounded-xl" />
          <div className="h-64 bg-[#13131A] rounded-xl" />
        </div>
      </div>
    </div>
  );
}
