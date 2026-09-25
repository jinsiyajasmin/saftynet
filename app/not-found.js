import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-gray-300">That page is not part of the SafetyNett site.</p>
      <Link href="/" className="text-[#6C63FF] font-medium">
        Back to home
      </Link>
    </div>
  );
}
