import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <p className="text-6xl mb-4">🔍</p>
      <h1 className="text-2xl font-bold text-[#E2E8F0] mb-2">Brand not found</h1>
      <p className="text-[#64748B] mb-6">This ticker hasn't been analyzed yet.</p>
      <Link href="/dashboard" className="text-[#6366F1] hover:text-[#818CF8] underline">
        ← Back to Dashboard
      </Link>
    </div>
  );
}
