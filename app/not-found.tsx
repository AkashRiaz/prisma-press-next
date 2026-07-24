import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6">
      <div className="max-w-2xl text-center">
        <div className="mb-6">
          <h1 className="text-8xl font-black tracking-tight text-slate-900">
            404
          </h1>

          <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-blue-600" />
        </div>

        <h2 className="text-3xl font-bold text-slate-900">
          Oops! Page not found
        </h2>

        <p className="mt-4 text-lg text-slate-600">
          The page you&apos;re looking for doesn&apos;t exist, may have been
          moved, or the URL might be incorrect.
        </p>

        <div className="my-10 flex justify-center">
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-blue-50">
            <Search
              className="h-20 w-20 text-blue-600"
              strokeWidth={1.5}
            />

            <span className="absolute -bottom-2 rounded-full bg-white px-4 py-1 text-sm font-medium shadow">
              Lost?
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            <Home size={18} />
            Go Home
          </Link>

        </div>

        <p className="mt-10 text-sm text-slate-500">
          Error Code: <span className="font-semibold">404</span> · Resource not
          found
        </p>
      </div>
    </main>
  );
}