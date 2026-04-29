export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      <div className="h-4 bg-[#13131A] rounded w-24 mb-6" />
      <div className="flex gap-4 mb-8">
        <div className="w-16 h-16 bg-[#13131A] rounded-2xl" />
        <div className="flex-1">
          <div className="h-7 bg-[#13131A] rounded w-48 mb-2" />
          <div className="h-4 bg-[#13131A] rounded w-32" />
        </div>
      </div>
      <div className="h-24 bg-[#13131A] rounded-xl mb-6" />
      <div className="h-64 bg-[#13131A] rounded-xl" />
    </div>
  );
}
