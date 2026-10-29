import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-ink">Page not found</h1>
      <p className="mt-2 text-ink-700">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-flame px-5 py-2 font-semibold text-white">Back to home</Link>
    </div>
  );
}
