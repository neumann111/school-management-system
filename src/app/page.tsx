export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-10 shadow-xl">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          Next.js 16 • React 19 • Tailwind CSS v4
        </span>

        <h1 className="mt-6 text-5xl font-bold tracking-tight">
          School Management System
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          A modern full-stack school management application built with
          Next.js, TypeScript, Prisma, and PostgreSQL.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700">
            Get Started
          </button>

          <button className="rounded-lg border border-gray-300 px-5 py-3 font-medium transition hover:bg-gray-100">
            Learn More
          </button>
        </div>
      </div>
    </main>
  );
}