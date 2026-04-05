import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] text-center">
      <main className="flex flex-col items-center gap-8 translate-y-[-5vh]">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative inline-flex items-center justify-center px-8 py-3 bg-white dark:bg-black rounded-full border border-gray-200 dark:border-gray-800">
            <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
              Antigravity Web is now live v1.0
            </span>
          </div>
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white max-w-4xl leading-tight">
          Welcome to your new <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            premium workspace
          </span>
        </h1>
        
        <p className="max-w-2xl text-lg sm:text-xl text-gray-600 dark:text-gray-400">
          A beautifully designed, simple frontend template built with Next.js and Tailwind CSS.
          Sign up to get started or log in to access your dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-4">
          <Link
            className="rounded-full border border-transparent transition-all flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-1 text-base h-12 px-8 font-medium w-full sm:w-auto"
            href="/signup"
          >
            Get Started Free
          </Link>
          <Link
            className="rounded-full border border-gray-300 dark:border-gray-700 transition-all flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white text-base h-12 px-8 font-medium w-full sm:w-auto"
            href="/login"
          >
            Log in
          </Link>
        </div>
      </main>

      <footer className="absolute bottom-8 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        <p>© 2026 Antigravity Web. All rights reserved.</p>
      </footer>
    </div>
  );
}
